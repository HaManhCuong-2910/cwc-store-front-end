<template>
  <div>
    <div class="title-category">
      <font-awesome-icon icon="fa-solid fa-bars" />
      Lọc sản phẩm
    </div>
    <ul class="mt-3">
      <li>
        <div class="sub-title my-2 text-sm text-gray-600">
          Tên sản phẩm
        </div>
        <div class="d-flex">
          <el-autocomplete
            v-model="state1"
            :fetch-suggestions="querySearch"
            clearable
            class="inline-input w-50 mr-2"
            :class="'input-custom'"
            placeholder="nhập tên sản phẩm"
            @select="handleSelect"
          />
          <el-button type="primary" class="btn-custom"
            >Tìm kiếm</el-button
          >
        </div>
      </li>
      <li>
        <div class="sub-title my-2 text-sm text-gray-600">
          Giá tiền
        </div>
        <div class="slide-custom">
          <el-slider
            range
            v-model="prices"
            @change="handlePrices"
          />
        </div>
      </li>
      <li>
        <div class="sub-title my-2 text-sm text-gray-600">
          size giày
        </div>
        <div class="slide-custom">
          <el-slider
            range
            v-model="size"
            @change="handleSize"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.title-category {
  font-size: 20px;
  text-align: center;
  background-color: #1e272e;
  color: #fff;
  border-radius: 10px;
  padding: 8px;
}
:deep(.input-custom) {
  height: 43px;
  border-radius: 10px;

  .el-input {
    height: 100%;
  }
}
.btn-custom {
  height: 43px;
  margin-left: 10px;
}
ul {
  list-style: none;
  padding: 0px;
  li {
    padding: 0px;
    margin-top: 20px;

    .slide-custom {
      margin-left: 11px;
    }
  }
}
</style>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
} from 'vue';
interface ProductsItem {
  value: string;
  link: string;
}

export default defineComponent({
  name: 'LeftSideBasketPage',
  setup() {
    const state1 = ref('');
    const prices = ref([0, 0]);
    const size = ref([0, 0]);

    const products = ref<ProductsItem[]>([]);
    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? products.value.filter(createFilter(queryString))
        : products.value;
      // call callback function to return suggestions
      cb(results);
    };
    const createFilter = (queryString: string) => {
      return (restaurant: ProductsItem) => {
        return (
          restaurant.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    };
    const loadAll = () => {
      return [
        {
          value: 'vue',
          link: 'https://github.com/vuejs/vue',
        },
        {
          value: 'element',
          link: 'https://github.com/ElemeFE/element',
        },
        {
          value: 'cooking',
          link: 'https://github.com/ElemeFE/cooking',
        },
        {
          value: 'mint-ui',
          link: 'https://github.com/ElemeFE/mint-ui',
        },
        {
          value: 'vuex',
          link: 'https://github.com/vuejs/vuex',
        },
        {
          value: 'vue-router',
          link: 'https://github.com/vuejs/vue-router',
        },
        {
          value: 'babel',
          link: 'https://github.com/babel/babel',
        },
      ];
    };

    const handleSelect = (item: ProductsItem) => {
      console.log(item);
    };

    const handlePrices = (value: number[]) => {
      console.log('value', value);
    };

    const handleSize = (value: number[]) => {
      console.log('value', value);
    };

    onMounted(() => {
      products.value = loadAll();
    });

    return {
      state1,
      handleSelect,
      querySearch,
      prices,
      size,
      handlePrices,
      handleSize,
    };
  },
});
</script>
