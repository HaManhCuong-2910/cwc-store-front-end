<template>
  <div class="cart container-base mt-4">
    <TimelineHorizontal />
    <TableCart />
  </div>
</template>

<script lang="ts">
import TimelineHorizontal from '@/components/cart/TimelineHorizontal.vue';
import TableCart from '@/components/cart/TableCart.vue';

export default {
  components: {
    TimelineHorizontal,
    TableCart,
  },
  setup() {},
};
</script>
