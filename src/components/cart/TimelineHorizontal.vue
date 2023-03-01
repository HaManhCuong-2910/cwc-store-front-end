<template>
  <div class="w-100 timeline-cart">
    <ul class="timeline">
      <li :class="data.InformationLine && 'active-tl'">
        Thông tin đơn hàng
      </li>
      <li :class="data.BuyerInformation && 'active-tl'">
        Thông tin người mua
      </li>
      <li :class="data.Order && 'active-tl'">Đặt hàng</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
  text-transform: uppercase;
}

.timeline-cart {
  height: 100px;
}

.timeline {
  counter-reset: test 0;
  position: relative;
}

.timeline li {
  list-style: none;
  float: left;
  width: 33.3333%;
  position: relative;
  text-align: center;
  text-transform: uppercase;
}

ul:nth-child(1) {
  color: #000;
}

.timeline li:before {
  counter-increment: test;
  content: counter(test);
  width: 50px;
  height: 50px;
  border: 3px solid #feca57;
  border-radius: 50%;
  display: block;
  text-align: center;
  line-height: 50px;
  margin: 0 auto 10px auto;
  background: #fff;
  color: #000;
  transition: all ease-in-out 0.3s;
  cursor: pointer;
}

.timeline li:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: grey;
  top: 25px;
  left: -50%;
  z-index: -999;
  transition: all ease-in-out 0.3s;
}

.timeline li:first-child:after {
  content: none;
}
.timeline li.active-tl {
  color: #555555;
}
.timeline li.active-tl:before {
  background: #222f3e;
  color: #f1f1f1;
}

.timeline li.active-tl + li:after {
  background: #feca57;
}
</style>

<script lang="ts">
import { ETimeline } from '@/store/cart/state';
import {
  defineComponent,
  onMounted,
  reactive,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TimelineHorizontal',
  setup() {
    const store = useStore();
    const data = reactive({
      InformationLine: true,
      BuyerInformation: false,
      Order: false,
    });
    const route = useRoute();
    const { params } = route;

    const handleTimeLine = (value: ETimeline) => {
      switch (value) {
        case ETimeline.BuyerInformation:
          data.InformationLine = true;
          data.BuyerInformation = true;
          data.Order = false;
          break;
        case ETimeline.Order:
          data.InformationLine = true;
          data.BuyerInformation = true;
          data.Order = true;
          break;
        default:
          data.InformationLine = true;
          data.BuyerInformation = false;
          data.Order = false;
          break;
      }
    };

    watch(
      () => route.params,
      (value) => {
        handleTimeLine(value.time_line as ETimeline);
      },
      { deep: true }
    );

    onMounted(() => {
      handleTimeLine(params.time_line as ETimeline);
    });

    return {
      data,
    };
  },
});
</script>
