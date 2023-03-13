<template>
  <div class="products-contain mt-5">
    <div class="products-intro">
      <h2>GIÀY BÓNG RỔ</h2>
      <LineTitle />
    </div>
    <div class="products mt-4">
      <div class="row">
        <div
          class="col-2"
          v-for="item in props.listProduct"
          :key="item"
          ref="product"
        >
          <router-link
            :to="{
              name: 'DetailBasket',
              params: {
                slug: item.slug,
              },
            }"
          >
            <div class="products-contain-card">
              <div class="products-contain-card-img">
                <img
                  :src="item.images[0]"
                  alt="Ảnh sản phẩm"
                />
              </div>
              <div
                class="products-contain-card-description"
              >
                <h4>{{ item.name }}</h4>
                <p>{{ item.category.name }}</p>
                <p class="prices">
                  <span class="red-prices"
                    >{{
                      formatNumberMony(item.sales)
                    }}
                    đ</span
                  >
                  <span
                    class="sale-prices"
                    v-if="
                      item.sales && item.sales_percent > 0
                    "
                    >{{
                      formatNumberMony(item.price)
                    }}
                    đ</span
                  >
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products-intro {
  h2 {
    display: inline-block;
    width: 15%;
    font-size: 21px;
  }
}

.products-contain-card {
  color: #000;
  .products-contain-card-img {
    border-radius: 12px;
    overflow: hidden;

    img {
      width: 100%;
      height: 200px;
    }
  }

  .products-contain-card-description {
    margin-top: 20px;

    h4 {
      font-size: 19px;

      &:hover {
        color: #ff3f34;
        transition: 0.3s;
      }
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
import { formatNumberMony } from '@/constant/constant';
import {
  defineComponent,
  onMounted,
  reactive,
  PropType,
  watch,
  ref,
} from 'vue';
import { TProduct } from '@/api/products/data';
import { AxiosResponse } from 'axios';
import ScrollReveal from 'scrollreveal';
import LineTitle from './helper/LineTitle.vue';

export default defineComponent({
  props: {
    listProduct: {
      type: Object as PropType<
        TProduct[] | AxiosResponse<TProduct[], any>
      >,
      required: true,
    },
  },
  components: {
    LineTitle,
  },
  setup(props) {
    const data = reactive({});
    const product = ref<any>();

    watch(
      () => product.value,
      () => {
        if (product.value[0]) {
          product.value.forEach(
            (element: any, index: number) => {
              ScrollReveal().reveal(element, {
                delay: 200 * index,
                duration: 1000,
                reset: true,
                distance: '150px',
                opacity: 0,
                origin: 'bottom',
              });
            }
          );
        }
      }
    );

    return {
      data,
      props,
      product,
      formatNumberMony,
    };
  },
});
</script>
