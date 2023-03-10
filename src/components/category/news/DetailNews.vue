<template>
  <div class="detail-news-contents container">
    <h1>
      {{ dataDetailNews.detailNews.title }}
    </h1>
    <p>
      {{ dataDetailNews.detailNews.author }} ,
      {{ dataDetailNews.detailNews.timestamp }}
    </p>
    <hr />
    <div
      class="contents"
      v-html="dataDetailNews.detailNews.description"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.detail-news-contents {
  .contents {
    margin: auto;
    font-size: 19px;
    line-height: 1.6;
    text-align: left;
    color: #333;
    font-weight: normal;
    margin-top: 32px;
  }
}
</style>

<script lang="ts">
import { getDetailNews } from '@/api/news';
import { DataGetListNewsResponse } from '@/api/news/data';
import { TDataCardNews } from '@/constant/constant';
import router from '@/router';
import moment from 'moment';
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from 'vue';
import { useRoute } from 'vue-router';

type TDataNews = {
  detailNews: TDataCardNews;
};

export default defineComponent({
  setup() {
    const route = useRoute();
    const { params } = route;
    const dataDetailNews = reactive<TDataNews>({
      detailNews: {
        id: '',
        author: '',
        img: '',
        timestamp: '',
        title: '',
        short_description: '',
        description: '',
      },
    });

    onMounted(async () => {
      const [res, err] = await getDetailNews(
        params.news_id as string
      );
      if (res) {
        const { data } = res;
        dataDetailNews.detailNews = {
          id: data.data._id,
          author: data.data.author,
          img: data.data.img,
          timestamp: moment(data.data.updatedAt)
            .locale('vi')
            .fromNow(),
          title: data.data.title,
          short_description: data.data.short_description,
          description: data.data.description,
        };
      } else {
        router.push({
          name: 'NotFound',
        });
      }
    });

    return {
      dataDetailNews,
    };
  },
});
</script>
