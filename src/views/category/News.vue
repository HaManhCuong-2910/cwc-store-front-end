<template>
  <div class="category container-base mt-4">
    <div class="container">
      <div class="news-top">
        <div class="row">
          <div class="col-6">
            <div class="news-card-top-first">
              <img
                src="https://sport5.mediacdn.vn/zoom/600_375/158855217956261888/2023/2/23/avatar1677137479784-16771374806872133111260.jpg"
                alt=""
              />
              <p>
                Bất ngờ trước lựa chọn cầu thủ tốt nhất NBA
                hiện tại của Anthony Edwards
              </p>
            </div>
          </div>
          <div class="col-6">
            <div class="news-card-top-second news-card">
              <img
                src="https://sport5.mediacdn.vn/zoom/600_375/158855217956261888/2023/2/23/avatar1677137479784-16771374806872133111260.jpg"
                alt=""
              />
              <p>
                Bất ngờ trước lựa chọn cầu thủ tốt nhất NBA
                hiện tại của Anthony Edwards
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="news-contain">
        <div class="row">
          <div
            class="col-12"
            v-for="item in dataCardNews"
            ref="cardNewsItem"
            :key="item"
          >
            <CardNews :item="item" />
          </div>
        </div>
      </div>
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
import CardNews from '@/components/category/news/CardNews.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { TDataCardNews } from '@/constant/constant';
import ScrollReveal from 'scrollreveal';

export default {
  components: {
    CardNews,
  },
  setup() {
    const dataCardNews = reactive<TDataCardNews[]>([]);
    const cardNewsItem = ref<any>();

    onMounted(() => {
      for (let i = 0; i < 5; i++) {
        dataCardNews.push({
          img: 'https://sport5.mediacdn.vn/zoom/600_375/158855217956261888/2023/2/23/avatar1677137479784-16771374806872133111260.jpg',
          title:
            'Bất ngờ trước lựa chọn cầu thủ tốt nhất NBA hiện tại của Anthony Edwards',
          timestamp: '2 ngày trước',
          description: `Trong thể thao chuyên nghiệp, trọng tài đóng vai
          trò quan trọng. Công việc của các vị vua áo đen là
          đảm bảo sự công bằng trong mỗi trận đấu, bao gồm
          cả những hình phạt răn đe các cầu thủ có hành vi
          không đúng mực. Tuy nhiên trọng tài cũng là con
          người và cũng phạm sai lầm. Nhưng hiếm khi các vị
          vua áo đen thay đổi quyết định của mình. Dù vậy
          các cầu thủ vẫn không ngừng phàn nàn với các trọng
          tài vì các quyết định đã được đưa ra. Ở NBA, khi
          những va chạm giữa cầu thủ xảy ra thường xuyên,
          các cầu thủ thường xuyên gây áp lực với trọng tài.`,
        });
      }
    });

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
    return {
      dataCardNews,
      cardNewsItem,
    };
  },
};
</script>
