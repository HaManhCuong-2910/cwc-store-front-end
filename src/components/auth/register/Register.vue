<template>
  <section>
    <div class="container py-5 h-100">
      <div
        class="row d-flex align-items-center justify-content-center h-100"
      >
        <div class="col-md-8 col-lg-7 col-xl-6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="img-fluid"
            alt="Phone image"
          />
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <el-form
            label-position="top"
            ref="formRegisterRef"
            :model="formRegister"
            size="large"
          >
            <div class="row">
              <div class="col-6">
                <el-form-item label="Họ và tên" prop="name">
                  <el-input v-model="formRegister.name" />
                </el-form-item>
              </div>
              <div class="col-6">
                <el-form-item
                  label="Số điện thoại"
                  prop="phoneNumber"
                >
                  <el-input
                    v-model="formRegister.phoneNumber"
                  />
                </el-form-item>
              </div>
              <div class="col-12">
                <el-form-item label="Email" prop="email">
                  <el-input
                    v-model="formRegister.email"
                    autocomplete="off"
                  />
                </el-form-item>
              </div>
              <div class="col-12">
                <el-form-item
                  label="Mật khẩu"
                  prop="password"
                >
                  <el-input
                    v-model="formRegister.password"
                    type="password"
                    show-password
                    autocomplete="off"
                  />
                </el-form-item>
              </div>
              <div class="col-12">
                <el-form-item
                  label="Ảnh đại diện"
                  prop="avatar"
                >
                  <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    :auto-upload="false"
                    action="#"
                    list-type="picture"
                    :on-change="handleChangeAvatar"
                  >
                    <img
                      v-if="imageUrl"
                      :src="imageUrl"
                      class="avatar"
                    />
                    <el-icon
                      v-else
                      class="avatar-uploader-icon"
                      ><Plus
                    /></el-icon>
                  </el-upload>
                </el-form-item>
                <div class="col-12">
                  <ProvinceInput
                    :province_id="formRegister.province_id"
                    @setProvince="setProvince"
                  />
                </div>
                <div class="col-12">
                  <DistrictInput
                    :province_id="formRegister.province_id"
                    :district_id="formRegister.district_id"
                    @setDistrict="setDistrict"
                  />
                </div>
                <div class="col-12">
                  <el-form-item
                    label="Số nhà, địa chỉ"
                    prop="address"
                  >
                    <el-input
                      v-model="formRegister.address"
                      autocomplete="off"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>

            <el-form-item>
              <el-button type="primary">Đăng ký</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 160px;
  height: 140px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 140px;
  text-align: center;
}
</style>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import ProvinceInput from '@/components/cart/location/ProvinceInput.vue';
import DistrictInput from '@/components/cart/location/DistrictInput.vue';
import { FormRules, UploadProps } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
interface IFormRegister {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar: string;
  province_id: string | number;
  district_id: string | number;
  address: string;
}

export default defineComponent({
  components: {
    ProvinceInput,
    DistrictInput,
    Plus,
  },
  setup() {
    const formRegister = reactive<IFormRegister>({
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      avatar: '',
      province_id: '',
      district_id: '',
      address: '',
    });

    const imageUrl = ref<any>('');

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
      address: [
        {
          required: true,
          message: 'Vui lòng nhập địa chỉ',
          trigger: 'blur',
        },
      ],
    });

    const handleChangeAvatar: UploadProps['onChange'] = (
      uploadFile,
      uploadFiles
    ) => {
      console.log('uploadFile', uploadFile);
      imageUrl.value = URL.createObjectURL(uploadFile.raw!);
    };

    const setProvince = (value: string) => {
      formRegister.province_id = value;
      formRegister.district_id = '';
    };

    const setDistrict = (value: string) => {
      formRegister.district_id = value;
    };

    return {
      formRegister,
      setProvince,
      setDistrict,
      imageUrl,
      handleChangeAvatar,
    };
  },
});
</script>
