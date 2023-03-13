<template>
  <div class="row">
    <div class="col-5">
      <AvatarUser
        :avatar="avatar"
        @changeAvatar="changeAvatar"
      />
    </div>
    <div class="col-7">
      <FormUserInfo
        :data="userInfo"
        :isLoading="isLoading"
        @submitUserInfo="submitUserInfo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from 'vue';
import { useStore } from 'vuex';
import AvatarUser from './child-components/AvatarUser.vue';
import FormUserInfo from './child-components/FormUserInfo.vue';
import { uploadFileToCloud } from '@/api/cloudinary';
import { IFormUserInfo } from '@/api/auth/data';
import { serviceUser } from '@/api/user/index';
import Swal from 'sweetalert2';

export default defineComponent({
  components: {
    AvatarUser,
    FormUserInfo,
  },
  setup() {
    const store = useStore();

    const { user } = store.state;
    const { avatar, ...userInfo } = user;
    let newAvatar: string | File = '';
    const isLoading = ref<boolean>(false);
    const updateUserInfo = async (data: any) => {
      const [res, error] =
        await serviceUser.updateUserInfoApi(
          data,
          user._id as string
        );
      isLoading.value = false;
      if (res && res.success === 200) {
        store.commit('updateUserInfo', res.data);
        Swal.fire({
          icon: 'success',
          title: 'Cập nhật tài khoản thành công',
          timer: 2000,
          showConfirmButton: true,
        });
      }
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra!',
          text: error.message,
        });
      }
    };

    const changeAvatar = async (fileUser: File) => {
      newAvatar = fileUser;
    };

    const submitUserInfo = async (data: IFormUserInfo) => {
      isLoading.value = true;
      const [res, err] = await uploadFileToCloud(
        newAvatar as File
      );
      if (res) {
        const { secure_url } = res;
        await updateUserInfo({
          ...data,
          ...{ avatar: secure_url },
        });
      }
      if (err) {
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra!',
          text: err.message,
        });
      }
    };

    return {
      avatar,
      userInfo,
      changeAvatar,
      submitUserInfo,
      isLoading,
    };
  },
});
</script>
