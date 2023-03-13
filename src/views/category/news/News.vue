<template>
  <div class="category container-base mt-4">
    <div class="container" v-if="dataCardNews.length > 0">
      <div class="news-top">
        <div class="row">
          <div class="col-6">
            <router-link
              :to="`/chi-tiet-tin-tuc/${
                dataCardNews && dataCardNews[0].id
              }`"
            >
              <div class="news-card-top-first">
                <img :src="dataCardNews[0].img" alt="" />
                <p>
                  {{ dataCardNews[0].title }}
                </p>
              </div>
            </router-link>
          </div>
          <div class="col-6">
            <router-link
              :to="`/chi-tiet-tin-tuc/${
                dataCardNews && dataCardNews[1].id
              }`"
            >
              <div class="news-card-top-second news-card">
                <img :src="dataCardNews[1].img" alt="" />
                <p>
                  {{ dataCardNews[0].title }}
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <hr />
      <div class="news-contain">
        <div class="row">
          <div
            class="col-12"
            v-for="(item, index) in dataCardNews"
            ref="cardNewsItem"
            :key="item.title"
          >
            <router-link
              :to="`/chi-tiet-tin-tuc/${
                dataCardNews && dataCardNews[index].id
              }`"
            >
              <CardNews :item="item" />
            </router-link>
          </div>
        </div>
      </div>
      <el-pagination
        class="justify-content-center"
        :current-page="dataNewsList.currentPage"
        :page-size="5"
        layout="prev, pager, next"
        :total="dataNewsList.totalRecord"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-top {
  margin-bottom: 20px;
}
:deep(img) {
  width: 100%;
  height: 100%;
}

:deep(.news-card) {
  width: 365px;
  height: 255px;
  color: #000;
  img {
    border-radius: 10px;
    overflow: hidden;
    object-fit: cover;
  }

  p {
    font-size: 18px;
    font-weight: 500;
  }
}
.news-card-top-first {
  position: relative;
  background-color: #000;
  border-radius: 10px;
  overflow: hidden;

  &::after {
    position: absolute;
    content: '';
    top: 0%;
    left: 0%;
    right: 0%;
    bottom: 0%;
    background: linear-gradient(
      to top,
      #00000080,
      #01010133
    );
    z-index: 1;
  }

  p {
    position: absolute;
    bottom: 0px;
    color: #fff;
    font-size: 26px;
    font-weight: 700;
    margin: 38px;
    line-height: 1.33;
    z-index: 2;
  }
}
</style>

<script lang="ts">
import moment from 'moment';
import CardNews from '@/components/category/news/CardNews.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { TDataCardNews } from '@/constant/constant';
import ScrollReveal from 'scrollreveal';
import { getListNews } from '@/api/news/index';
import { DataGetListNewsResponse } from '@/api/news/data';
import { useRoute } from 'vue-router';
import router from '@/router';

export default {
  components: {
    CardNews,
  },
  setup() {
    const route = useRoute();
    const dataCardNews = ref<TDataCardNews[]>([]);
    const cardNewsItem = ref<any>();
    const dataNewsList = reactive({
      currentPage: 0,
      totalRecord: 0,
    });

    const handleSearch = async (query?: any) => {
      const [res, err] = await getListNews(query);

      if (res) {
        const { data } = res;

        dataNewsList.currentPage = data.page;
        dataNewsList.totalRecord = data.countRecord;

        dataCardNews.value = data.data.map(
          (item: DataGetListNewsResponse) => {
            return {
              id: item._id,
              author: item.author,
              img: item.img,
              timestamp: moment(item.updatedAt)
                .locale('vi')
                .fromNow(),
              title: item.title,
              short_description: item.short_description,
              description: item.description,
            };
          }
        );
      }
    };

    onMounted(async () => {
      if (Object.keys(route.query).length === 0) {
        await handleSearch({ limit: 5 });
      } else {
        await handleSearch(route.query);
      }
    });

    watch(
      () => route.query,
      async () => {
        await handleSearch(route.query);
      }
    );

    watch(
      () => cardNewsItem.value,
      () => {
        if (cardNewsItem.value[0]) {
          cardNewsItem.value.forEach(
            (element: any, index: number) => {
              ScrollReveal().reveal(element, {
                delay: 200 * index,
                duration: 1000,
                distance: '150px',
                opacity: 0,
                origin: 'bottom',
              });
            }
          );
        }
      }
    );

    const handleCurrentChange = (page: number) => {
      router.push({
        path: 'tin-tuc',
        query: {
          page,
          limit: 5,
        },
      });
    };
    return {
      dataCardNews,
      cardNewsItem,
      handleCurrentChange,
      dataNewsList,
    };
  },
};
</script>
