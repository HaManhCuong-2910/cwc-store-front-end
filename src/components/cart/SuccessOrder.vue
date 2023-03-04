<template>
  <el-empty
    :description="dataResult.message"
    image="/gif/order_success.gif"
    class="custom-order-success"
  />
</template>

<style lang="scss" scoped>
.custom-order-success {
  :deep(.el-empty__description) {
    p {
      font-size: 1.4rem;
      color: #ff3f34;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { TResultOrder } from './TableCart.vue';

export default defineComponent({
  props: ['resultOrder'],
  setup(props) {
    const dataResult = ref<TResultOrder>(props.resultOrder);

    return {
      dataResult,
    };
  },
});
</script>
