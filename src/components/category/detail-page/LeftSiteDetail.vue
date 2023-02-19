<template>
  <div class="left-site rounded">
    <swiper
      @swiper="setControlledSwiper"
      :loop="true"
      :allowTouchMove="false"
      :modules="modules"
      class="product-img"
    >
      <swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-6.jpg"
      /></swiper-slide>
    </swiper>
    <swiper
      @swiper="setControlledSwiperClicked"
      @click="handleClickSlide"
      :loop="false"
      :spaceBetween="20"
      :speed="500"
      :slidesPerView="4"
      :modules="modules"
      class="product-slide-img"
    >
      <swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
      ><swiper-slide />
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.left-site {
  overflow: hidden;
  .product-img {
    margin-bottom: 18px;
    border-radius: 10px;
    border: 1px solid #7f8c8d;
    img {
      height: 428px;
      width: 100%;
      cursor: pointer;
      transform-origin: center center;
      object-fit: cover;
    }
  }
  .product-slide-img {
    .active-clicked {
      img {
        border: 1px solid red;
      }
    }

    img {
      cursor: pointer;
      margin-bottom: 18px;
      border-radius: 10px;
      border: 1px solid #7f8c8d;
      width: 100px;
      height: 100px;
    }
  }
}
</style>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
} from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
interface TProps {
  images: string[];
}

export default defineComponent({
  name: 'LeftSiteDetail',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['images'],
  setup(props: TProps) {
    const controlledSwiper = ref<any>(null);
    const controlledSwiperClicked = ref<any>(null);
    const setControlledSwiper = (swiper: any) => {
      controlledSwiper.value = swiper;
    };
    const setControlledSwiperClicked = (swiper: any) => {
      controlledSwiperClicked.value = swiper;
    };
    const handleClickSlide = (swiper: any, event: any) => {
      const index_currentSlide = swiper.clickedIndex;
      handleSetActiveClicked(index_currentSlide);
    };

    const handleSetActiveClicked = (index: number) => {
      controlledSwiper.value.slideTo(index + 1);
      controlledSwiperClicked.value.slides.forEach(
        (element: HTMLDivElement) => {
          element.classList.remove('active-clicked');
        }
      );
      controlledSwiperClicked.value.slides[
        index
      ].classList.add('active-clicked');
    };

    onMounted(() => {
      handleSetActiveClicked(0);
    });

    return {
      modules: [],
      props,
      handleClickSlide,
      setControlledSwiper,
      setControlledSwiperClicked,
    };
  },
});
</script>
