<template>
  <div class="products-contain mt-5">
    <div class="products-intro">
      <h2>GIÀY BÓNG RỔ</h2>
    </div>
    <div class="products mt-4">
      <div class="row">
        <div
          class="col-2"
          v-for="item in props.listProduct"
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
import {
  defineComponent,
  onMounted,
  reactive,
  PropType,
  watch,
} from 'vue';
import { TProduct } from '@/api/products/data';

export default defineComponent({
  props: {
    listProduct: {
      type: Object as PropType<TProduct[]>,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({});

    return {
      data,
      props,
    };
  },
});
</script>
