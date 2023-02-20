<template>
  <span
    class="snow"
    v-for="index in 200"
    :key="index"
  ></span>
</template>

<style>
@import url('@/assets/css/snow.css');
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SnowAnimation',
  setup() {},
});
</script>
