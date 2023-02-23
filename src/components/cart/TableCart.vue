<template>
  <div class="table-cart container mt-3">
    <div class="row">
      <div class="col-8">
        <ListProductsCart />
      </div>
      <div class="col-4">
        <div class="description">
          <p><b>Cộng giỏ hàng</b></p>
          <p class="d-flex justify-content-between">
            <span>Tạm tính</span>
            <span>{{ data.sumPrice }}đ</span>
          </p>
          <hr />
          <p><b>Giao hàng</b></p>
          <el-radio-group
            v-model="data.delivery"
            class="mt-1"
          >
            <el-radio
              :label="EDelivery.FREE_SHIP"
              size="large"
              >Giao hàng miễn phí</el-radio
            >
          </el-radio-group>
          <hr />
          <p class="d-flex justify-content-between">
            <b>Tổng</b>
            <b class="price">{{ data.sumPrice }} đ</b>
          </p>
          <el-button
            v-if="
              data.timeline === ETimeline.InformationLine
            "
            class="btn-order"
            @click="HandleOrderClick"
            type="danger"
            >Tiến hành thanh toán</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  b {
    font-size: 18px;
  }
  font-size: 16px;
  .btn-order {
    height: 50px;
    font-size: 16px;
    float: right;
  }
}
</style>

<script lang="ts">
import { TProductCart } from '@/constant/constant';
import { ETimeline } from '@/store/cart/state';
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import ListProductsCart from '@/components/cart/ListProductsCart.vue';
import { useStore } from 'vuex';
enum EDelivery {
  FREE_SHIP = 'FREE_SHIP',
}

interface TData {
  sumPrice: number;
  delivery: EDelivery;
  timeline: ETimeline;
}

export default defineComponent({
  name: 'TableCart',
  components: { ListProductsCart },
  setup() {
    const data = reactive<TData>({
      sumPrice: 0,
      delivery: EDelivery.FREE_SHIP,
      timeline: ETimeline.InformationLine,
    });
    const store = useStore();
    const { cart } = store.state;

    const handleCart = () => {
      data.sumPrice = 0;
      if (cart.length > 0) {
        cart.forEach((item: TProductCart) => {
          data.sumPrice += item.quantity * item.price;
        });
      }
    };

    onMounted(() => {
      handleCart();
    });

    watch(
      () => store.state.timeline_cart,
      () => {
        data.timeline = store.state.timeline_cart;
      }
    );

    watch(
      () => cart,
      () => {
        handleCart();
      },
      { deep: true }
    );

    const HandleOrderClick = () => {
      store.dispatch(
        'changeTimeLineCart',
        ETimeline.BuyerInformation
      );
    };

    return {
      data,
      HandleOrderClick,
      EDelivery,
      ETimeline,
    };
  },
});
</script>
