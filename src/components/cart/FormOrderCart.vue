<template>
  <el-form
    :model="form"
    :label-position="'left'"
    :rules="rules"
    label-width="120px"
  >
    <div class="row">
      <div class="col-6">
        <el-form-item label="Họ và tên">
          <el-input
            v-model="form.name"
            placeholder="Nhập họ và tên"
          />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item label="Số điện thoại">
          <el-input
            v-model="form.phoneNumber"
            placeholder="Nhập số điện thoại"
          />
        </el-form-item>
      </div>
      <div class="col-12">
        <el-form-item label="Email">
          <el-input
            v-model="form.email"
            placeholder="Nhập email"
          />
        </el-form-item>
      </div>
      <div class="col-6">
        <ProvinceInput
          :province_id="form.province_id"
          @setProvince="setProvince"
        />
      </div>
      <div class="col-6">
        <DistrictInput
          :province_id="form.province_id"
          :district_id="form.district_id"
          @setDistrict="setDistrict"
        />
      </div>
      <div class="col-12">
        <el-form-item label="Số nhà, địa chỉ">
          <el-input
            v-model="form.address"
            placeholder="Nhập địa chỉ"
          />
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import ProvinceInput from '@/components/cart/location/ProvinceInput.vue';
import DistrictInput from '@/components/cart/location/DistrictInput.vue';
import { FormInstance, FormRules } from 'element-plus';
import { useStore } from 'vuex';
import { TOrderCart } from '@/api/cart/data';
import { OrderCart } from '@/api/cart';
import NProgress from 'nprogress'; // progress bar
import { useRouter } from 'vue-router';
import { ETimeline } from '@/store/cart/state';
interface IFormData {
  name: string;
  email: string;
  phoneNumber: string;
  province_id: string | number;
  district_id: string | number;
  address: string;
}

export default defineComponent({
  components: {
    ProvinceInput,
    DistrictInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { cart } = store.state;
    const form = reactive<IFormData>({
      name: '',
      email: '',
      phoneNumber: '',
      province_id: '',
      district_id: '',
      address: '',
    });

    const rules = reactive<FormRules>({
      name: [
        {
          required: true,
          message: 'Vui lòng nhập họ và tên',
          trigger: 'blur',
        },
      ],
      email: [
        {
          required: true,
          message: 'Vui lòng nhập email',
          trigger: 'blur',
        },
      ],
      phoneNumber: [
        {
          required: true,
          message: 'Vui lòng nhập số điện thoại',
          trigger: 'blur',
        },
      ],
      province_id: [
        {
          required: true,
          message: 'Vui lòng nhập tỉnh / thành phố',
          trigger: 'blur',
        },
      ],
      district_id: [
        {
          required: true,
          message: 'Vui lòng nhập quận / huyện',
          trigger: 'blur',
        },
      ],
    });

    const onSubmit = async () => {
      const filterCart = cart.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          size: item.size,
          size_id: item.size_id,
          quantity: item.quantity,
        };
      });
      const dataOrderCart: TOrderCart = {
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        province: `${form.province_id}`,
        district: `${form.district_id}`,
        address: form.address,
        data: filterCart,
      };
      NProgress.start();
      const [resultOrder, error] = await OrderCart(
        dataOrderCart
      );
      if (resultOrder) {
        NProgress.done();
        store.dispatch('clearProductToCart');
        router.push({
          name: 'CartPage',
          params: {
            time_line: ETimeline.Order,
          },
        });
      } else {
        // console.log('resultOrder', error);
      }
    };

    const setProvince = (value: string) => {
      form.province_id = value;
      form.district_id = '';
    };

    const setDistrict = (value: string) => {
      form.district_id = value;
    };

    return {
      form,
      onSubmit,
      setProvince,
      setDistrict,
      rules,
    };
  },
});
</script>
