<template>
  <el-form
    label-position="top"
    :rules="rules"
    ref="formUserInfoRef"
    :model="formUserInfo"
    size="large"
  >
    <div class="row">
      <div class="col-6">
        <el-form-item label="Họ và tên" prop="name">
          <el-input v-model="formUserInfo.name" />
        </el-form-item>
      </div>
      <div class="col-6">
        <el-form-item
          label="Số điện thoại"
          prop="phoneNumber"
        >
          <el-input v-model="formUserInfo.phoneNumber" />
        </el-form-item>
      </div>
      <div class="col-12">
        <el-form-item label="Email" prop="email">
          <el-input
            v-model="formUserInfo.email"
            autocomplete="off"
          />
        </el-form-item>
      </div>
      <div class="col-12">
        <div class="col-12">
          <ProvinceInput
            :province_id="formUserInfo.province_id"
            @setProvince="setProvince"
          />
        </div>
        <div class="col-12">
          <DistrictInput
            :province_id="formUserInfo.province_id"
            :district_id="formUserInfo.district_id"
            @setDistrict="setDistrict"
          />
        </div>
        <div class="col-12">
          <el-form-item
            label="Số nhà, địa chỉ"
            prop="address"
          >
            <el-input
              v-model="formUserInfo.address"
              autocomplete="off"
            />
          </el-form-item>
        </div>
      </div>
    </div>

    <el-form-item class="w-100">
      <el-button
        :loading="props.isLoading"
        class="m-auto"
        type="danger"
        @click="onSubmit"
        >Cập nhật</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import ProvinceInput from '@/components/cart/location/ProvinceInput.vue';
import DistrictInput from '@/components/cart/location/DistrictInput.vue';
import { IFormUserInfo } from '@/api/auth/data';
import { validatePhoneNumber } from '@/constant/constant';
import { FormRules } from 'element-plus';
import Swal from 'sweetalert2';

export default defineComponent({
  components: {
    ProvinceInput,
    DistrictInput,
  },
  props: ['data', 'isLoading'],
  setup(props, { emit }) {
    const formUserInfo = reactive<IFormUserInfo>({
      name: props.data?.name,
      email: props.data?.email,
      phoneNumber: props.data?.phoneNumber,
      province_id: props.data?.province_id,
      district_id: props.data?.district_id,
      address: props.data?.address,
    });

    const formUserInfoRef = ref<any>(null);

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
          validator: validatePhoneNumber,
          trigger: 'blur',
        },
      ],
      province_id: [
        {
          required: true,
          message: 'Vui lòng nhập tỉnh / thành',
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

    const setProvince = (value: string) => {
      formUserInfo.province_id = value;
      formUserInfo.district_id = '';
    };

    const setDistrict = (value: string) => {
      formUserInfo.district_id = value;
    };

    const onSubmit = async () => {
      await formUserInfoRef.value.validate(
        async (valid: any, fields: any) => {
          if (valid) {
            emit('submitUserInfo', formUserInfo);
          }
        }
      );
    };

    return {
      formUserInfo,
      formUserInfoRef,
      rules,
      onSubmit,
      setProvince,
      setDistrict,
      props,
    };
  },
});
</script>
