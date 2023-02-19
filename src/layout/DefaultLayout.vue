<template>
  <div class="home">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<style scoped></style>

<script lang="ts">
import Header from '@/components/sideLayout/defaultLayout/HeaderDefaultLayout.vue';
import Footer from '@/components/sideLayout/defaultLayout/FooterDefaultLayout.vue';
import { defineComponent } from '@vue/runtime-core';

import { reactive } from '@vue/reactivity';

export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    const data = reactive({});

    return {
      data,
    };
  },
});
</script>
