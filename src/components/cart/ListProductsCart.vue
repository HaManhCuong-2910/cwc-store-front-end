<template>
  <el-table
    :data="data.dataTable"
    :empty-text="'Giỏ hàng trống'"
    class="product"
  >
    <el-table-column label="Ảnh sản phẩm" align="center">
      <template #default="scope">
        <img :src="scope.row.image" :alt="scope.row.name" />
      </template>
    </el-table-column>
    <el-table-column label="Tên sản phẩm" align="center">
      <template #default="scope">
        <p>
          {{ scope.row.name }} -
          {{ scope.row.size }}
        </p>
      </template>
    </el-table-column>
    <el-table-column label="Giá sản phẩm" align="center">
      <template #default="scope">
        <b>{{ scope.row.price }}đ</b>
      </template>
    </el-table-column>
    <el-table-column label="Số lượng" align="center">
      <template #default="scope">
        <el-input-number
          v-model="data.dataTable[scope.$index].quantity"
          :min="1"
          :max="scope.row.maxQuantity"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped>
.product {
  width: 100%;
  img {
    width: 150px;
    height: 150px;
  }
}
</style>

<script lang="ts">
import { TProduct } from '@/api/products/data';
import { TProductCart } from '@/constant/constant';
import {
  defineComponent,
  onMounted,
  reactive,
  watch,
} from 'vue';
import { useStore } from 'vuex';

interface TData {
  dataTable: TProductCart[];
}

export default defineComponent({
  setup() {
    const data = reactive<TData>({
      dataTable: [],
    });

    const store = useStore();

    const { cart } = store.state;
    onMounted(() => {
      data.dataTable = cart;
    });

    watch(
      () => cart,
      () => {
        data.dataTable = cart;
      },
      { deep: true }
    );

    return {
      data,
    };
  },
});
</script>
