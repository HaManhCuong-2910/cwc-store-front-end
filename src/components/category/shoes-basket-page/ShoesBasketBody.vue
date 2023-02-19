<template>
  <div class="main-category mt-5">
    <div class="row">
      <div class="col-3">
        <LeftSideBasketPage />
      </div>
      <div class="col-9">
        <div class="row" v-if="data.isLoading">
          <div
            class="col-3"
            v-for="index in 4"
            :key="index"
          >
            <LoadingCard />
          </div>
        </div>

        <div class="row" v-else>
          <div
            class="col-3"
            v-for="item in props.products"
            :key="item"
          >
            <el-card class="card-container redirect-link">
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
                    >{{ item.price }} đ</span
                  >
                  <span class="sale" v-if="item.sales"
                    >{{
                      item.price * (100 - item.sales)
                    }}
                    đ</span
                  >
                </div>
                <div class="btn-order mt-3">
                  <el-button type="primary" plain
                    >Đặt hàng</el-button
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  width: 90%;
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
import {
  defineComponent,
  PropType,
  reactive,
  watch,
} from 'vue';
import LoadingCard from '@/components/loading/LoadingCard.vue';
import LeftSideBasketPage from '@/components/category/shoes-basket-page/LeftSideBasketPage.vue';

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
  emits: ['changePage'],
  setup(props, { emit }) {
    const data = reactive({
      isLoading: false,
    });

    watch(
      () => props.loading,
      (value: boolean) => {
        data.isLoading = value;
      }
    );

    const handlePagination = (page: number) => {
      emit('changePage', page);
    };

    return {
      props,
      data,
      handlePagination,
    };
  },
});
</script>
