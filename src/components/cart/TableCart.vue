<template>
  <div class="table-cart container mt-3">
    <div v-if="data.timeline === ETimeline.Order">
      <SuccessOrder :resultOrder="data.resultOrder" />
    </div>
    <div class="row" v-else>
      <div class="col-8">
        <ListProductsCart
          v-if="
            data.timeline === ETimeline.InformationLine ||
            !data.timeline
          "
        />
        <FormOrderCart
          v-if="
            data.timeline === ETimeline.BuyerInformation
          "
          ref="buyerForm"
          @pushResultOrder="pushResultOrder"
          @formOrderChange="formOrderChange"
          @isDisablePaypal="isDisablePaypal"
        />
      </div>
      <div class="col-4">
        <div class="description">
          <p><b>Cộng giỏ hàng</b></p>
          <p class="d-flex justify-content-between">
            <span>Tạm tính</span>
            <span
              >{{ formatNumberMony(data.sumPrice) }} đ</span
            >
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
            <b class="price"
              >{{ formatNumberMony(data.sumPrice) }} đ</b
            >
          </p>
          <el-button
            v-if="
              data.timeline === ETimeline.InformationLine ||
              !data.timeline
            "
            class="btn-order w-100 mb-3"
            @click="HandleOrderClick"
            type="danger"
            :disabled="data.isEmptyCart"
            >Tiến hành đặt hàng</el-button
          >

          <el-button
            v-if="
              data.timeline === ETimeline.BuyerInformation
            "
            class="btn-order w-100 mb-3"
            @click="handleBuyerClick"
            type="danger"
            :disabled="data.isEmptyCart"
            >Đặt hàng</el-button
          >
          <PaypalButtonsComponent
            v-if="
              data.timeline ===
                ETimeline.BuyerInformation &&
              !data.isEmptyCart
            "
            :formOrderPaypal="data.formOrder"
            :changeDisable="data.changeDisablePaypal"
            :sumPrice="data.sumPrice"
            @orderPaypal="orderPaypal"
          />
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
import {
  EStatusPaymentOrder,
  TProductCart,
} from '@/constant/constant';
import { ETimeline } from '@/store/cart/state';
import { formatNumberMony } from '@/constant/constant';
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import ListProductsCart from '@/components/cart/ListProductsCart.vue';
import FormOrderCart, {
  IFormData,
} from '@/components/cart/FormOrderCart.vue';
import SuccessOrder from '@/components/cart/SuccessOrder.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { TProduct } from '@/api/products/data';
import PaypalButtonsComponent from './PaypalButtonsComponent.vue';
enum EDelivery {
  FREE_SHIP = 'FREE_SHIP',
}

export type TResultOrder = {
  message: string;
  status: number;
  order_bill: TProduct[];
};

interface TData {
  sumPrice: number;
  delivery: EDelivery;
  timeline: ETimeline | '';
  isEmptyCart: boolean;
  resultOrder: TResultOrder | null;
  formOrder: IFormData | null;
  changeDisablePaypal: boolean;
}

export default defineComponent({
  name: 'TableCart',
  components: {
    ListProductsCart,
    FormOrderCart,
    SuccessOrder,
    PaypalButtonsComponent,
  },
  setup() {
    const data = reactive<TData>({
      sumPrice: 0,
      delivery: EDelivery.FREE_SHIP,
      timeline: ETimeline.InformationLine,
      isEmptyCart: true,
      resultOrder: null,
      formOrder: null,
      changeDisablePaypal: true,
    });
    const buyerForm = ref<any>(null);
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { cart } = store.state;
    const { params } = route;

    const handleCart = () => {
      data.sumPrice = 0;
      data.isEmptyCart = true;
      if (cart.length > 0) {
        data.isEmptyCart = false;
        cart.forEach((item: TProductCart) => {
          data.sumPrice += item.quantity * item.price;
        });
      }
    };

    onMounted(() => {
      handleCart();
      data.timeline = params.time_line as ETimeline;
    });

    watch(
      () => cart,
      () => {
        handleCart();
      },
      { deep: true }
    );

    watch(
      () => route.params,
      (value) => {
        data.timeline = value.time_line as ETimeline;
      },
      { deep: true }
    );

    const HandleOrderClick = () => {
      router.push({
        name: 'CartPage',
        params: {
          time_line: ETimeline.BuyerInformation,
        },
      });
    };

    const handleBuyerClick = () => {
      buyerForm.value.onSubmit({
        status_payment: EStatusPaymentOrder.NO_PAY,
      });
    };

    const pushResultOrder = (resultOrder: TResultOrder) => {
      data.resultOrder = resultOrder;
    };

    const orderPaypal = (order: any) => {
      if (order.status === 'COMPLETED') {
        buyerForm.value.onSubmit({
          status_payment: EStatusPaymentOrder.PAYED,
        });
      }
    };

    const formOrderChange = (order: IFormData) => {
      data.formOrder = order;
    };

    const isDisablePaypal = (isDisable: boolean) => {
      data.changeDisablePaypal = isDisable;
    };

    return {
      data,
      buyerForm,
      HandleOrderClick,
      handleBuyerClick,
      pushResultOrder,
      EDelivery,
      ETimeline,
      formatNumberMony,
      orderPaypal,
      formOrderChange,
      isDisablePaypal,
    };
  },
});
</script>
