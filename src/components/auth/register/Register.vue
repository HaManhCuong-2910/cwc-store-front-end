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
            :rules="rules"
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

            <el-form-item class="w-100">
              <el-button
                :loading="isLoading"
                class="m-auto"
                type="danger"
                @click="onSubmit"
                >Đăng ký</el-button
              >
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
import { validatePhoneNumber } from '@/constant/constant';
import { IFormRegister } from '@/api/auth/data';
import { RegisterApi } from '@/api/auth';
import Swal from 'sweetalert2';
import router from '@/router';

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

    const formRegisterRef = ref<any>(null);

    const imageUrl = ref<any>('');

    const isLoading = ref<boolean>(false);

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
      password: [
        {
          required: true,
          message: 'Vui lòng nhập password',
          trigger: 'blur',
        },
      ],
      phoneNumber: [
        {
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
      address: [
        {
          required: false,
          message: 'Vui lòng nhập địa chỉ',
          trigger: 'blur',
        },
      ],
    });

    const handleChangeAvatar: UploadProps['onChange'] = (
      uploadFile,
      uploadFiles
    ) => {
      imageUrl.value = URL.createObjectURL(uploadFile.raw!);
    };

    const setProvince = (value: string) => {
      formRegister.province_id = value;
      formRegister.district_id = '';
    };

    const setDistrict = (value: string) => {
      formRegister.district_id = value;
    };

    const onSubmit = async () => {
      await formRegisterRef.value.validate(
        async (valid: any, fields: any) => {
          if (valid) {
            isLoading.value = true;
            const [res, err] = await RegisterApi(
              formRegister
            );
            if (res && res.data.success === 200) {
              isLoading.value = false;
              Swal.fire({
                icon: 'success',
                title: 'Đăng ký tài khoản thành công',
                timer: 2000,
                showConfirmButton: false,
              });
              router.push({
                name: 'Login',
              });
            }

            if (err) {
              Swal.fire({
                icon: 'error',
                title: 'Có lỗi xảy ra!',
                text: err.message,
              });
            }
          }
        }
      );
    };

    return {
      formRegister,
      formRegisterRef,
      rules,
      onSubmit,
      setProvince,
      setDistrict,
      imageUrl,
      isLoading,
      handleChangeAvatar,
    };
  },
});
</script>
