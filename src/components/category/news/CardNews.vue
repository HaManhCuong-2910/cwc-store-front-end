<template>
  <div class="card-news-contain">
    <div class="news-card-custom">
      <img :src="props.item.img" alt="" />
      <div class="description">
        <h3>
          {{ props.item.title }}
        </h3>
        <span>{{ props.item.timestamp }}</span>
        <p>
          {{ props.item.short_description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-news-contain {
  color: #000;
  margin-top: 20px;

  .news-card-custom {
    display: flex;

    img {
      width: 365px;
      height: 255px;
      border-radius: 10px;
      overflow: hidden;
      object-fit: cover;
    }

    .description {
      margin-top: 8px;
      width: 70%;
      margin-left: 25px;

      span {
        font-size: 14px;
      }

      h3 {
        font-size: 24px;
      }

      p {
        font-size: 18px;
        margin-top: 15px;
        display: -webkit-box;
        max-width: 100%;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}
</style>

<script lang="ts">
import { TDataCardNews } from '@/constant/constant';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<TDataCardNews>,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
