<template>
  <div class="home">
    <SnowAnimation />
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<style scoped>
.home {
  position: relative;
  overflow: hidden;
}
</style>

<script lang="ts">
import Header from '@/components/sideLayout/defaultLayout/HeaderDefaultLayout.vue';
import Footer from '@/components/sideLayout/defaultLayout/FooterDefaultLayout.vue';
import SnowAnimation from '@/components/snow-animation/SnowAnimation.vue';
import { defineComponent } from '@vue/runtime-core';

import { reactive } from '@vue/reactivity';

export default defineComponent({
  components: {
    Header,
    Footer,
    SnowAnimation,
  },
  setup() {
    const data = reactive({});

    return {
      data,
    };
  },
});
</script>
