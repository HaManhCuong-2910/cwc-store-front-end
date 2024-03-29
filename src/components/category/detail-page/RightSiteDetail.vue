<template>
  <div class="right-site">
    <h1>{{ props.product.name }}</h1>
    <h2>{{ formatNumberMony(newPrice) }} đ</h2>
    <div class="size">
      <p>Kích cỡ</p>
      <el-radio-group
        v-model="activeSize"
        v-for="item in props.product.quantities.sort(
          (a, b) => a.size - b.size
        )"
        :key="item"
        size="large"
      >
        <el-radio-button
          class="size-btn"
          :label="item.size"
        />
      </el-radio-group>
    </div>
    <div class="order">
      <p>
        Số lượng còn lại: <span>{{ maxQuantity }}</span>
      </p>
    </div>
    <div
      class="text-style"
      @click="isShowDialogInstruct = true"
    >
      <font-awesome-icon
        :icon="['fas', 'ruler-horizontal']"
      />
      <span> Hướng dẫn chọn cỡ giày </span>
    </div>
    <div class="order">
      <p>Số lượng</p>
      <el-input-number
        class="quantity"
        v-model="quantity"
        :min="1"
        :max="maxQuantity"
      />
      <el-button
        type="danger"
        class="btn-order"
        @click="handleOrder"
        >Đặt hàng</el-button
      >
    </div>
    <div class="description">
      <p class="des_text mt-4">Mô tả</p>
      <p
        class="des_item_text"
        v-snip="{ lines: 7, onSnipped }"
        v-if="isSniped"
      >
        {{ props.product.description }}
      </p>
      <el-button
        type="danger"
        v-if="isSniped"
        @click="() => onSnipped({ hasEllipsis: false })"
        plain
        >Đọc thêm</el-button
      >

      <p class="des_item_text" v-if="!isSniped">
        {{ props.product.description }}
      </p>
    </div>
  </div>
  <el-dialog
    v-model="isShowDialogInstruct"
    title=""
    align-center
  >
    <div class="padding-all-12">
      <img
        src="https://peaksport.vn/wp-content/uploads/2021/03/chon-size-3-1024x622.jpg"
      />
      <img
        src="https://peaksport.vn/wp-content/uploads/2021/03/chon-size-2-1024x630.jpg"
      />
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.padding-all-12 {
  padding: 12px;
}
img {
  width: 100%;
  object-fit: contain;
}
.right-site {
  .text-style {
    font-size: 16px;
    font-weight: 400;
    color: #f56c6c;
    cursor: pointer;
  }
  h1 {
    font-size: 40px;
  }

  h2 {
    font-size: 22px;
    margin-top: 20px;
  }

  .size {
    p {
      font-weight: 500;
      font-size: 17px;
      margin-top: 30px;
      margin-bottom: 10px;
      color: #535c68;
    }

    :deep(.size-btn) {
      margin-right: 10px;

      &.is-active {
        .el-radio-button__inner {
          background-color: #ff3f34 !important;
          border: none;
        }
      }

      &.is-focus {
        .el-radio-button__inner {
          color: #fff !important;
        }
      }
    }
  }

  .order {
    margin-top: 30px;

    p {
      font-weight: 500;
      font-size: 17px;
      color: #535c68;
    }

    .quantity {
      height: 40px;
      margin-right: 20px;
    }

    .btn-order {
      height: 40px;
      width: 120px;
      font-size: 18px;
    }
  }

  .description {
    .des_text {
      font-weight: 500;
      font-size: 17px;
      color: #535c68;
    }

    .des_item_text {
      display: block;
      text-align: justify;
    }
  }
}
</style>

<script lang="ts">
import { Quantity, TProduct } from '@/api/products/data';
import { formatNumberMony } from '@/constant/constant';
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router';
interface TProps {
  product: TProduct;
}

export default defineComponent({
  name: 'RightSiteDetail',
  props: ['product'],
  setup(props: TProps) {
    const router = useRouter();
    const store = useStore();
    const { price, sales } = toRefs(props.product);
    const newPrice = ref<number>(
      sales.value ? sales.value : price.value
    );
    const maxQuantity = ref<number>(
      props.product.quantities[0].quantity
    );
    const quantity = ref<number>(1);
    const isSniped = ref<boolean>(true);
    const activeSize = ref<number>(
      props.product.quantities[0].size
    );
    const isShowDialogInstruct = ref<boolean>(false);

    const onSnipped = (newState: {
      hasEllipsis: boolean;
    }) => {
      isSniped.value = newState.hasEllipsis;
    };

    const getSizeDetail = (size: number) => {
      return props.product.quantities.find(
        (item: Quantity) => size === item.size
      );
    };

    const handleOrder = () => {
      const { _id, name, images, slug } = props.product;
      store.dispatch('addProductToCart', {
        id: _id,
        name: name,
        slug: slug,
        quantity: quantity.value,
        image: images[0],
        price: newPrice.value,
        maxQuantity: maxQuantity.value,
        size: getSizeDetail(activeSize.value)?.size,
        size_id: getSizeDetail(activeSize.value)?._id,
      });
      ElNotification({
        title: 'Thành công',
        message: 'Thêm vào giỏ hàng thành công',
        type: 'success',
        position: 'bottom-right',
        duration: 2000,
        customClass: 'cursor-pointer',
        onClick: () => {
          router.push({
            name: 'CartPage',
          });
        },
      });
    };

    watch(
      () => activeSize.value,
      (active) => {
        const productQuantity =
          props.product.quantities.find(
            (item) => item.size === active
          );
        maxQuantity.value = productQuantity?.quantity
          ? productQuantity.quantity
          : props.product.quantities[0].size;
      }
    );

    return {
      quantity,
      maxQuantity,
      activeSize,
      props,
      isSniped,
      isShowDialogInstruct,
      newPrice,
      onSnipped,
      handleOrder,
      formatNumberMony,
    };
  },
});
</script>
