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
            ref="formForgotPassRef"
            :model="formForgotPass"
            size="large"
          >
            <div class="row">
              <div class="col-12">
                <el-form-item label="Email" prop="email">
                  <el-input
                    :readonly="
                      stepForgot !==
                      EStepForgot.FORGOT_PASSWORD
                    "
                    v-model="formForgotPass.email"
                    autocomplete="off"
                  />
                </el-form-item>
              </div>
              <div
                class="col-12"
                v-if="
                  stepForgot ===
                  EStepForgot.RESET_FORGOT_PASSWORD
                "
              >
                <el-form-item
                  label="Mã lấy lại mật khẩu"
                  prop="code"
                >
                  <el-input
                    v-model="formForgotPass.code"
                    autocomplete="off"
                  />
                </el-form-item>
              </div>
              <div
                class="col-12"
                v-if="
                  stepForgot === EStepForgot.RESET_PASSWORD
                "
              >
                <el-form-item
                  label="Mật khẩu mới"
                  prop="password"
                >
                  <el-input
                    v-model="formForgotPass.password"
                    type="password"
                    show-password
                    autocomplete="off"
                  />
                </el-form-item>
              </div>
            </div>

            <el-form-item class="w-100">
              <el-button
                :loading="isLoading"
                class="m-auto"
                type="danger"
                @click="onSubmit"
                >{{
                  stepForgot === EStepForgot.FORGOT_PASSWORD
                    ? 'Gửi mã về email'
                    : stepForgot ===
                      EStepForgot.RESET_FORGOT_PASSWORD
                    ? 'Xác minh mã xác nhận'
                    : 'Cập nhật mật khẩu mới'
                }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { FormRules, UploadProps } from 'element-plus';
import Swal from 'sweetalert2';
import router from '@/router';
import {
  ForgotPassword,
  ResetForgotPassword,
  ResetPassword,
} from '@/api/auth';
import { useStore } from 'vuex';

enum EStepForgot {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  RESET_FORGOT_PASSWORD = 'RESET_FORGOT_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

export default defineComponent({
  components: {},
  setup() {
    const formForgotPass = reactive({
      email: '',
      code: '',
      password: '',
    });
    const store = useStore();
    const { state } = store;
    const formForgotPassRef = ref<any>(null);
    const stepForgot = ref<EStepForgot>(
      EStepForgot.FORGOT_PASSWORD
    );
    const isLoading = ref<boolean>(false);

    const rules = reactive<FormRules>({
      email: [
        {
          required: true,
          message: 'Vui lòng nhập email',
          trigger: 'blur',
        },
      ],
      code: [
        {
          required: true,
          message: 'Vui lòng nhập mã',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: 'Vui lòng nhập mật khẩu mới',
          trigger: 'blur',
        },
      ],
    });

    const handleStepForgotPassword = async () => {
      const [res, err] = await ForgotPassword(
        formForgotPass.email
      );
      if (res && res.data.status === 202) {
        isLoading.value = false;
        stepForgot.value =
          EStepForgot.RESET_FORGOT_PASSWORD;
        Swal.fire({
          icon: 'success',
          title:
            'Vui lòng kiểm tra email và nhập mã lấy lại mật khẩu',
          timer: 2000,
          showConfirmButton: false,
        });
      }

      if (err) {
        isLoading.value = false;
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra!',
          text: err.message,
        });
      }
    };

    const handleStepResetForgotPassword = async () => {
      const [res, err] = await ResetForgotPassword({
        email: formForgotPass.email,
        code: formForgotPass.code,
      });
      if (res && res.data.status === 200) {
        const token_reset_password =
          res.data.data.token_reset;
        store.commit(
          'setTokenResetPassword',
          token_reset_password
        );
        isLoading.value = false;
        stepForgot.value = EStepForgot.RESET_PASSWORD;
      }

      if (err) {
        isLoading.value = false;
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra!',
          text: err.message,
        });
      }
    };

    const handleStepResetPassword = async () => {
      const [res, err] = await ResetPassword({
        email: formForgotPass.email,
        token_reset: store.state
          .token_reset_password as string,
        password: formForgotPass.password,
      });

      if (res) {
        console.log('res', res);
        store.commit('clearTokenResetPassword');
        isLoading.value = false;
        // stepForgot.value = EStepForgot.FORGOT_PASSWORD;
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật mật khẩu mới thành công',
          timer: 2000,
          showConfirmButton: false,
        });
        router.push({
          name: 'Login',
        });
      }

      if (err) {
        isLoading.value = false;
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra!',
          text: err.message,
        });
      }
    };

    const onSubmit = async () => {
      await formForgotPassRef.value.validate(
        async (valid: any, fields: any) => {
          if (valid) {
            isLoading.value = true;
            switch (stepForgot.value) {
              case EStepForgot.FORGOT_PASSWORD:
                await handleStepForgotPassword();
                break;
              case EStepForgot.RESET_FORGOT_PASSWORD:
                await handleStepResetForgotPassword();
                break;
              case EStepForgot.RESET_PASSWORD:
                await handleStepResetPassword();
                break;
            }
          }
        }
      );
    };

    return {
      rules,
      onSubmit,
      formForgotPass,
      stepForgot,
      formForgotPassRef,
      isLoading,
      EStepForgot,
    };
  },
});
</script>
