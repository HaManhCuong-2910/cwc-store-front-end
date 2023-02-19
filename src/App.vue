<template>
  <component :is="data.layout">
    <router-view></router-view>
  </component>
</template>

<style>
@import '@/assets/css/base.css';
</style>
<script>
import { useRoute } from 'vue-router';
import { PUBLIC_LAYOUT } from '@/constant/layout';
import DefaultLayout from '@/layout/DefaultLayout.vue';
import TestLayout from '@/layout/TestLayout.vue';
import { reactive, watch } from '@vue/runtime-core';
export default {
  components: {
    DefaultLayout,
    TestLayout,
  },
  setup() {
    const route = useRoute();

    const data = reactive({
      layout: PUBLIC_LAYOUT,
    });

    watch(
      () => route.name,
      () => {
        data.layout = route.meta.layout || PUBLIC_LAYOUT;
      }
    );

    return {
      data,
    };
  },
};
</script>
