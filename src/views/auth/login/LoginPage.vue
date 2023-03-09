<template>
  <div class="login">
    <Login />
  </div>
</template>

<script lang="ts">
import { reactive } from '@vue/reactivity';
import { onMounted } from 'vue';
import Login from '@/components/auth/login/Login.vue';

export default {
  components: { Login },
  setup() {
    return {};
  },
};
</script>
