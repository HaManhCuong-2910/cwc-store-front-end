<template>
  <section class="vh-100">
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
          <form @submit="onSubmitForm">
            <div class="form-outline mb-4 has-validation">
              <label class="form-label" for="email"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="dataForm.email"
                @blur="validate('email')"
                class="form-control form-control-lg"
                :class="errors.email && 'is-invalid'"
              />
              <p
                class="invalid-feedback"
                v-if="errors.email"
              >
                {{ errors.email }}
              </p>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="password"
                >Mật khẩu</label
              >
              <input
                type="password"
                id="password"
                v-model="dataForm.password"
                @blur="validate('password')"
                class="form-control form-control-lg"
                :class="errors.password && 'is-invalid'"
              />
              <p
                class="invalid-feedback"
                v-if="errors.password"
              >
                {{ errors.password }}
              </p>
            </div>

            <div
              class="d-flex justify-content-around align-items-center mb-4"
            >
              <router-link
                :to="{
                  name: 'Register',
                }"
                class="text-dark text-decoration-underline"
              >
                Đăng ký tài khoản
              </router-link>
              <router-link
                :to="{
                  name: 'ForgotPassword',
                }"
                class="text-dark text-decoration-underline"
                >Quên mật khẩu?</router-link
              >
            </div>

            <!-- Submit button -->
            <div class="text-center">
              <button
                :disabled="isLoading"
                type="submit"
                class="btn btn-danger btn-lg btn-block"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

<script lang="ts">
import { Login } from '@/api/auth';
import { IDataFormLogin } from '@/api/auth/data';
import Swal from 'sweetalert2';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import * as yup from 'yup';

enum EFieldDataForm {
  email = 'email',
  password = 'password',
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const dataForm = reactive<IDataFormLogin>({
      email: '',
      password: '',
    });

    const errors = reactive<IDataFormLogin>({
      email: '',
      password: '',
    });

    const isLoading = ref<boolean>(false);

    const loginFormSchema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
    });

    const validate = (field: EFieldDataForm) => {
      loginFormSchema
        .validateAt(field, dataForm)
        .then(() => {
          errors[field] = '';
        })
        .catch((err) => {
          errors[field] = err.message;
        });
    };

    const onSubmitForm = (e: any) => {
      e.preventDefault();
      loginFormSchema
        .validate(dataForm, { abortEarly: false })
        .then(async () => {
          isLoading.value = true;
          const [result, err] = await Login(dataForm);
          isLoading.value = false;

          if (result) {
            const { access_token, user } = result.data;
            store.commit('setAccessToken', {
              access_token,
              user,
            });
            router.push({
              name: 'home',
            });
            return;
          }
          Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại!',
            text: 'Tài khoản không tồn tại',
          });
        })
        .catch((err) => {
          err.inner.forEach(
            (error: {
              path: EFieldDataForm;
              message: string;
            }) => {
              errors[error.path] = error.message;
            }
          );
        });
    };

    return {
      dataForm,
      errors,
      isLoading,
      validate,
      onSubmitForm,
    };
  },
});
</script>
