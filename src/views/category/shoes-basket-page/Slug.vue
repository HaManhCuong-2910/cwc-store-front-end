<template>
  <div class="category container-base mt-4">
    <b-breadcrumb>
      <b-breadcrumb-item
        :active="item.active"
        :to="`/${item.href}`"
        v-for="item in data.items"
        :key="item.text"
      >
        {{ item.text }}
      </b-breadcrumb-item>
    </b-breadcrumb>
    <ShoesBasketBody
      :loading="data.loadingProducts"
      :products="data.products"
      :page="data.page"
      :count="data.count"
      @changePage="handleChangePage"
    />
  </div>
</template>

<script lang="ts">
import { reactive } from '@vue/reactivity';
import { onMounted, watch } from 'vue';
import { RouteParams, useRoute } from 'vue-router';
import { getCategoryByCondition } from '@/api/category';
import { getProducts } from '@/api/products';
import { TProduct } from '@/api/products/data';
import ShoesBasketBody from '@/components/category/shoes-basket-page/ShoesBasketBody.vue';
import { TItems } from '@/constant/constant';

interface IDataSlug {
  items: TItems[];
  loadingProducts: boolean;
  products: TProduct[];
  page: number;
  count: number;
  category_id: string;
}

export default {
  components: { ShoesBasketBody },
  setup() {
    const data = reactive<IDataSlug>({
      items: [],
      products: [],
      loadingProducts: false,
      page: 1,
      count: 0,
      category_id: '',
    });

    const router = useRoute();

    const handleBreadcrumb = async (value: RouteParams) => {
      data.items = [
        {
          text: 'Trang chủ',
          href: '',
        },
        {
          text: 'Giày bóng rổ',
          href: 'giay-bong-ro',
          active: true,
        },
      ];
      if (value.slug && value.slug !== '') {
        const { name, _id, slug } = (
          await getCategoryByCondition({
            slug: value.slug,
          })
        ).data;
        if (name && _id) {
          document.title = name;
          data.category_id = _id;
          data.items.push({
            text: name,
            href: slug as string,
            active: true,
          });
          await getProductsFilter({ limit: 1 });
        }
      }
    };

    const getProductsFilter = async (filter?: any) => {
      data.loadingProducts = true;
      const products = await getProducts({
        category: data.category_id,
        ...filter,
      });

      if (products.status === 200) {
        data.loadingProducts = false;
        data.products = products.data.data;
        data.page = Number(products.data.page);
        data.count = products.data.count;
      }
    };

    const handleChangePage = async (
      page: number,
      limit = 1
    ) => {
      getProductsFilter({ page, limit });
    };

    watch(
      () => router.params,
      async (value) => {
        await handleBreadcrumb(value);
      }
    );

    watch(
      () => data.items.length,
      () => {
        const newDataItems = data.items.map((value) => {
          delete value.active;
          return value;
        });
        newDataItems[newDataItems.length - 1].active = true;

        data.items = newDataItems;
      }
    );

    onMounted(async () => {
      data.items = [
        {
          text: 'Trang chủ',
          href: '',
        },
        {
          text: 'Giày bóng rổ',
          href: 'giay-bong-ro',
          active: true,
        },
      ];
      await handleBreadcrumb(router.params);
    });

    return { data, handleChangePage };
  },
};
</script>
