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
            v-model="defaultName"
            :fetch-suggestions="querySearch"
            clearable
            :debounce="400"
            class="inline-input w-50 mr-2"
            :class="'input-custom'"
            placeholder="nhập tên sản phẩm"
            @select="handleSelectName"
          />
          <el-button
            type="danger"
            class="btn-custom"
            @click="handleSearch"
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
            v-model="defaultPrices"
            :max="maxPricesCustom"
            :format-tooltip="formatNumberMony"
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
            v-model="defaultSize"
            :max="50"
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

  .is-focus {
    box-shadow: 0 0 0 1px #ff3f34 inset;
  }
}
.btn-custom {
  height: 43px;
  margin-left: 10px;
}

.slide-custom {
  :deep(.el-slider__bar) {
    background-color: #ff3f34;
  }

  :deep(.el-slider__button) {
    border-color: #ff3f34;
  }
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
import { getProducts } from '@/api/products';
import { TProduct } from '@/api/products/data';
import { formatNumberMony } from '@/constant/constant';
import { value } from 'dom7';
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { string } from 'yup';
export interface ProductsItem {
  value: string;
  link: string;
}

interface TData {
  name: string;
  from_price: number;
  to_price: number;
  from_size: number;
  to_size: number;
}

export default defineComponent({
  name: 'LeftSideBasketPage',
  emits: ['actionLoading', 'searchProducts'],
  setup(props, { emit }) {
    const defaultName = ref('');
    const defaultPrices = ref([0, 0]);
    const defaultSize = ref([0, 0]);
    const maxPricesCustom = ref(100);
    const route = useRoute();

    const products = ref<ProductsItem[]>([]);
    const data = reactive<TData>({
      name: '',
      from_price: 0,
      to_price: 0,
      from_size: 0,
      to_size: 0,
    });
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
      const { data, maxPrices } = products;
      maxPricesCustom.value = maxPrices;
      return data.map((item: TProduct) => {
        return {
          value: item.name,
          link: item._id,
        };
      });
    };

    const handleSelectName = (item: ProductsItem) => {
      data.name = item.value;
    };

    const handleSearchByQuery = (query: any) => {
      defaultName.value = query.name;
      data.name = query.name;
      handleSearch();
    };

    watch(
      () => route.query,
      () => {
        handleSearchByQuery(route.query);
      }
    );

    const handlePrices = (value: number[]) => {
      const [from_price, to_price] = value;
      data.from_price = from_price;
      data.to_price = to_price;
    };

    const handleSize = (value: number[]) => {
      const [from_size, to_size] = value;
      data.from_size = from_size;
      data.to_size = to_size;
    };

    const handleSearch = async () => {
      emit('actionLoading', true);
      const searchResult = (
        await getProducts({
          limit: 16,
          ...data,
        })
      ).data;
      maxPricesCustom.value = searchResult.maxPrices;
      emit('searchProducts', searchResult);
      emit('actionLoading', false);
    };

    onMounted(async () => {
      if (route.query) {
        // handleSearchByQuery(route.query);
      } else {
        products.value = await loadAll();
      }
    });

    return {
      defaultName,
      querySearch,
      handleSearch,
      handleSelectName,
      defaultPrices,
      defaultSize,
      handlePrices,
      handleSize,
      maxPricesCustom,
      formatNumberMony,
    };
  },
});
</script>
