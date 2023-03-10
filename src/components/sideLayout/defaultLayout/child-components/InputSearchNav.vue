<template>
  <div class="input-search">
    <el-autocomplete
      v-model="name"
      :fetch-suggestions="querySearch"
      clearable
      :debounce="400"
      class="input-custom"
      placeholder="nhập tên sản phẩm"
      @select="handleSelectName"
      @blur="handleBlur"
    >
      <template #prefix>
        <font-awesome-icon
          icon="fa-solid fa-magnifying-glass"
        />
      </template>
    </el-autocomplete>

    <!-- <input type="text" placeholder="Search" /> -->
  </div>
</template>

<style lang="scss" scoped>
.input-search {
  position: relative;
  :deep(.input-custom) {
    .el-input__wrapper {
      box-shadow: none;
      input {
        border: none;
        outline: none;
        height: 40px;
        background-color: #e5e5e5;
        padding: 10px 0px 10px 40px;
        font-size: 14px;
        border-radius: 18px;
      }
    }
  }

  svg {
    position: absolute;
    top: 12px;
    left: 25px;
    color: #1e1e1e;
    font-size: 18px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>

<script lang="ts">
import { getProducts } from '@/api/products';
import { TProduct } from '@/api/products/data';
import { ProductsItem } from '@/components/category/shoes-basket-page/LeftSideBasketPage.vue';
import router from '@/router';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  setup() {
    const name = ref('');
    const products = ref<ProductsItem[]>([]);

    const handleSearch = (name: string) => {
      router.replace(`/giay-bong-ro?name=${name}`);
    };

    const handleSelectName = (item: ProductsItem) => {
      handleSearch(item.value);
    };

    const handleBlur = (event: any) => {
      handleSearch(event.target.value);
    };

    const querySearch = async (
      queryString: string,
      cb: any
    ) => {
      const searchResult = (
        await getProducts({
          page: 1,
          limit: 5,
          name: queryString,
        })
      ).data.data;
      const results = searchResult
        ? searchResult.map((item: TProduct) => {
            return {
              value: item.name,
              link: item._id,
            };
          })
        : products.value;
      cb(results);
    };
    const loadAll = async () => {
      const products = (
        await getProducts({ page: 1, limit: 5 })
      ).data;
      const { data } = products;
      return data.map((item: TProduct) => {
        return {
          value: item.name,
          link: item._id,
        };
      });
    };

    onMounted(async () => {
      products.value = await loadAll();
    });

    return {
      name,
      querySearch,
      handleSelectName,
      handleBlur,
    };
  },
});
</script>
