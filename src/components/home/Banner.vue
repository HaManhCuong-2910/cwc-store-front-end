<template>
  <div class="banner">
    <div class="banner-swiper">
      <swiper
        :slides-per-view="1"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
        }"
        :speed="800"
        :modules="modules"
        :loop="true"
      >
        <swiper-slide
          v-for="item in data.listImage"
          :key="item"
        >
          <img
            :src="item"
            alt="banner image"
            class="banner-img rounded"
          />
        </swiper-slide>
      </swiper>
    </div>

    <BannerDetail />
  </div>
</template>

<style lang="scss" scoped>
.banner-swiper {
  position: relative;
  overflow: hidden;

  .banner-img {
    width: 100%;
    height: 600px;
    object-fit: cover;
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { getBannerHome } from '@/api/home/index';
import BannerDetail from '@/components/home/BannerDetail.vue';

type TBanner = {
  listImage: string[];
};

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    BannerDetail,
  },
  setup() {
    const data = reactive<TBanner>({
      listImage: [],
    });

    onMounted(async () => {
      data.listImage = await getBannerHome();
    });
    return {
      modules: [Autoplay],
      data,
    };
  },
});
</script>
