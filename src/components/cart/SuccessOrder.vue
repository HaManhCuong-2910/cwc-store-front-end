<template>
  <div class="order-success-container">
    <h1 class="text-center my-5">
      Bạn đã đặt hàng thành công
    </h1>
    <el-table
      :data="dataResult.order_bill"
      stripe
      align="center"
      header-align="center"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="name"
        label="Tên sản phẩm"
        width="180"
      />
      <el-table-column
        align="center"
        prop="size"
        label="Kích cỡ"
        width="100"
      />
      <el-table-column
        align="center"
        prop="quantity"
        label="Số lượng"
        width="150"
      />
      <el-table-column
        label="Giá"
        align="center"
        width="180"
      >
        <template #default="scope">
          <b>{{ formatNumberMony(scope.row.price) }} VNĐ</b>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 24px;
  color: #ff3f34;
}
// .order-success-container {
//   background-image: url('../../assets/images/order-success.webp');
//   background-repeat: no-repeat;
//   background-position: center center;
// }
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
import { formatNumberMony } from '@/constant/constant';
import { defineComponent, ref, watch } from 'vue';
import { TResultOrder } from './TableCart.vue';

export default defineComponent({
  props: ['resultOrder'],
  setup(props) {
    const dataResult = ref<TResultOrder>(props.resultOrder);

    return {
      dataResult,
      formatNumberMony,
    };
  },
});
</script>
