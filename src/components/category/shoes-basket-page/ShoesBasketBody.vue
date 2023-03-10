<template>
  <div class="main-category mt-5">
    <div class="row">
      <div class="col-3">
        <LeftSideBasketPage
          @actionLoading="actionLoading"
          @searchProducts="handleSearchProducts"
        />
      </div>
      <div class="col-9">
        <div class="row" v-if="data.isLoading">
          <div
            class="col-3"
            v-for="index in 16"
            :key="index"
          >
            <LoadingCard />
          </div>
        </div>
        <div v-else>
          <div v-if="data.products.length > 0">
            <div class="row">
              <div
                class="col-3 mb-3"
                v-for="item in data.products"
                :key="item._id"
              >
                <el-card
                  class="card-container redirect-link"
                >
                  <div class="image">
                    <img :src="item.images[0]" />
                  </div>

                  <div class="card-detail-container">
                    <router-link
                      :to="{
                        name: 'DetailBasket',
                        params: {
                          slug: item.slug,
                        },
                      }"
                      ><p class="title">
                        {{ item.name }}
                      </p></router-link
                    >

                    <div class="card-detail-description">
                      <span class="prices"
                        >{{
                          formatNumberMony(item.sales)
                        }}
                        đ</span
                      >
                      <span
                        class="sale"
                        v-if="
                          item.sales &&
                          item.sales_percent > 0
                        "
                        >{{
                          formatNumberMony(item.price)
                        }}
                        đ</span
                      >
                    </div>
                  </div>
                </el-card>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-5">
              <el-pagination
                layout="prev, pager, next"
                :page-count="props.count"
                :current-page="props.page"
                @current-change="handlePagination"
              />
            </div>
          </div>
          <div v-else>
            <el-empty
              :image-size="200"
              :description="'Không có sản phẩm nào'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  overflow: hidden;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

  &:hover {
    .image {
      img {
        transform: scale(1.1);
        transition: 0.3s;
      }
    }
  }

  :deep(.el-card__body) {
    padding: 0px;
  }

  .image {
    width: 100%;
    height: 240px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .card-detail-container {
    margin-bottom: 20px;
    .title {
      margin: 12px;
      font-size: 1rem;
      font-weight: 500;
      text-align: center;
      color: #000;

      &:hover {
        color: #ff3f34;
        transition: 0.3s;
      }
    }

    .btn-order {
      width: 100%;
      text-align: center;

      button {
        width: 110px;
        height: 38px;
        transition: 0.3s;
      }
    }

    .card-detail-description {
      display: flex;
      margin: 0px 12px;
      justify-content: center;

      span {
        font-weight: 600;
        font-size: 16px;
      }

      .sale {
        text-decoration: line-through;
        color: #808e9b;
        margin-left: 10px;
      }
    }
  }
}
</style>

<script lang="ts">
import { TProduct } from '@/api/products/data';
import { formatNumberMony } from '@/constant/constant';
import {
  defineComponent,
  PropType,
  reactive,
  watch,
} from 'vue';
import LoadingCard from '@/components/loading/LoadingCard.vue';
import LeftSideBasketPage from '@/components/category/shoes-basket-page/LeftSideBasketPage.vue';

interface TDataBody {
  isLoading: boolean;
  products: TProduct[];
}

export default defineComponent({
  components: { LoadingCard, LeftSideBasketPage },
  props: {
    products: {
      type: Object as PropType<TProduct[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  emits: ['changePage', 'actionLoading', 'searchProducts'],
  setup(props, { emit }) {
    const data = reactive<TDataBody>({
      isLoading: false,
      products: [],
    });

    watch(
      () => props.loading,
      (value: boolean) => {
        data.isLoading = value;
      }
    );

    const actionLoading = (isLoading: boolean) => {
      emit('actionLoading', isLoading);
    };

    const handleSearchProducts = (dataProducts: {
      data: TProduct[];
      page: number;
      count: number;
      maxPrices: number;
    }) => {
      emit('searchProducts', dataProducts);
    };

    watch(
      () => props.products,
      (value) => {
        data.products = props.products;
      }
    );

    const handlePagination = (page: number) => {
      emit('changePage', page);
    };

    return {
      props,
      data,
      handlePagination,
      formatNumberMony,
      actionLoading,
      handleSearchProducts,
    };
  },
});
</script>
