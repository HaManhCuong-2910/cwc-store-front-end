<template>
  <div class="home container-base mt-4">
    <Banner />
    <Products />
  </div>
</template>

<script lang="ts">
import { reactive } from '@vue/reactivity';
import { onMounted } from 'vue';
import Banner from '@/components/home/Banner.vue';
import Products from '@/components/home/ProductsHot.vue';

export default {
  components: { Banner, Products },
  setup() {
    return {};
  },
};
</script>
