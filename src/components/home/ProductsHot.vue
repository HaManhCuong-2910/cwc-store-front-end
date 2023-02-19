<template>
  <div class="products-contain mt-5">
    <div class="products-intro">
      <h2>SẢN PHẨM NỔI BẬT</h2>
    </div>
    <div class="products mt-4">
      <div class="row">
        <div
          class="col-2"
          v-for="item in data.listProducts"
          :key="item"
        >
          <div class="products-contain-card">
            <div class="products-contain-card-img">
              <img
                :src="item.images[0]"
                alt="Ảnh sản phẩm"
              />
            </div>
            <div class="products-contain-card-description">
              <h4>{{ item.name }}</h4>
              <p>{{ item.category.name }}</p>
              <p class="prices">
                <span class="red-prices"
                  >{{ item.sales }} đ</span
                >
                <span class="sale-prices"
                  >{{ item.price }} đ</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ProductNormal :listProduct="data.listProductNormal" />
</template>

<style lang="scss" scoped>
.products-intro {
  h2 {
    font-size: 21px;
  }
}

.products-contain-card {
  .products-contain-card-img {
    border-radius: 12px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .products-contain-card-description {
    margin-top: 20px;

    h4 {
      font-size: 19px;
    }

    p {
      font-size: 15px;
      font-weight: 600;
      color: #95a5a6;
    }

    .prices {
      .red-prices {
        color: #ea2027;
      }

      .sale-prices {
        margin-left: 24px;
        text-decoration: line-through;
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { getProducts } from '@/api/products/index';
import { AxiosResponse } from 'axios';
import { TProduct } from '@/api/products/data';
import ProductNormal from '@/components/home/Products.vue';

interface IProducts {
  listProducts: TProduct[];
  listProductNormal:
    | TProduct[]
    | AxiosResponse<TProduct[], any>;
}

export default defineComponent({
  components: {
    ProductNormal,
  },
  setup() {
    const data = reactive<IProducts>({
      listProducts: [],
      listProductNormal: [],
    });

    onMounted(async () => {
      const result = await getProducts();
      data.listProductNormal = result.data.data;
      data.listProducts = result.data.data.filter(
        (item: TProduct) => item.is_hot
      );
    });

    return {
      data,
    };
  },
});
</script>
