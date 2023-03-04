<template>
  <div class="container-base mt-4">
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
    <div class="row mt-5">
      <div class="col-4">
        <LeftSiteDetail
          :images="data.images"
          v-if="data.images.length > 0"
        />
      </div>
      <div class="col-8">
        <RightSiteDetail
          :product="data.product"
          v-if="data.product"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, watch, onMounted } from 'vue';
import { TItems } from '@/constant/constant';
import { RouteParams, useRoute } from 'vue-router';
import { findProductByCondition } from '@/api/products';
import LeftSiteDetail from '@/components/category/detail-page/LeftSiteDetail.vue';
import RightSiteDetail from '@/components/category/detail-page/RightSiteDetail.vue';
import { TProduct } from '@/api/products/data';

interface IDataSlug {
  items: TItems[];
  images: string[];
  product: TProduct | null;
}

export default {
  components: {
    LeftSiteDetail,
    RightSiteDetail,
  },
  setup() {
    const data = reactive<IDataSlug>({
      items: [],
      images: [],
      product: null,
    });
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
        const product = (
          await findProductByCondition({
            slug: value.slug as string,
          })
        ).data;
        data.product = product;
        const { name, _id, category, slug, images } =
          product;
        if (name && _id) {
          document.title = name;
          const newArrayItems = [
            {
              text: category.name,
              href: `giay-bong-ro/${category.slug}`,
            },
            {
              text: name,
              href: slug as string,
              active: true,
            },
          ];
          data.items = [...data.items, ...newArrayItems];
          data.images = images;
        }
      }
    };
    const router = useRoute();
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

    return {
      data,
    };
  },
};
</script>
