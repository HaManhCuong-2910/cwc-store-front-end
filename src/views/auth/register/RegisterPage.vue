<template>
  <div class="login">
    <Register />
  </div>
</template>

<script lang="ts">
import Register from '@/components/auth/register/Register.vue';

export default {
  components: { Register },
  setup() {
    return {};
  },
};
</script>
