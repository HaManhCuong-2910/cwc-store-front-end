<template>
  <div class="login">
    <ForgotPasswordComponent />
  </div>
</template>

<script lang="ts">
import { reactive } from '@vue/reactivity';
import { onMounted } from 'vue';
import ForgotPasswordComponent from '@/components/auth/forgot-password/ForgotPasswordComponent.vue';

export default {
  components: { ForgotPasswordComponent },
  setup() {
    return {};
  },
};
</script>
