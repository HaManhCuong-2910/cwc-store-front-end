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
          id: i,
          author: 'Hà Cường',
          img: 'https://sport5.mediacdn.vn/zoom/600_375/158855217956261888/2023/2/23/avatar1677137479784-16771374806872133111260.jpg',
          title:
            'Bất ngờ trước lựa chọn cầu thủ tốt nhất NBA hiện tại của Anthony Edwards',
          timestamp: '2 ngày trước',
          short_description: `Trong thể thao chuyên nghiệp, trọng tài đóng vai
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
          description: `<p>Anthony Edwards, pick 1 tại kỳ Draft NBA 2020 là một trong số những cầu thủ thú vị tại NBA. Không quá khi nói rằng ngôi sao trẻ của Minnessota Timberwolves đang là một trong những ứng cử viên tiềm tàng cho danh hiệu MVP sau này tại NBA. Sự thú vị của Anthony Edwards không chỉ đến từ lối chơi, sự tự tin mãnh liệt vào bản thân nơi chàng cầu thủ cao 1m93 là một phần lý do khiến NHM cũng như cả giải đấu chú ý tới Anthony.</p><figure class="VCSortableInPreviewMode" type="Photo" style=""><div><img src="https://sport5.mediacdn.vn/158855217956261888/2023/2/23/getpaidstockcom-63f6f44d23bfc-1677128806662417482934-1677137479713-16771374806891029080553.jpg" alt="Bất ngờ trước lựa chọn cầu thủ tốt nhất NBA hiện tại của Anthony Edwards - Ảnh 1." title="Bất ngờ trước lựa chọn cầu thủ tốt nhất NBA hiện tại của Anthony Edwards - Ảnh 1." type="photo" style="max-width:100%;" class="" w="1024" h="683" rel="lightbox" data-original="https://sport5.mediacdn.vn/158855217956261888/2023/2/23/getpaidstockcom-63f6f44d23bfc-1677128806662417482934-1677137479713-16771374806891029080553.jpg" width="" height=""></div><figcaption class="PhotoCMS_Caption"><p data-placeholder="[Nhập chú thích ảnh]">Anthony Edwards, một trong những cái tên thú vị trong dàn sao trẻ của NBA hiện tại</p></figcaption></figure><p>Vốn là một người tự tin, các phát ngôn của Anthony Edwards phần lớn đều gây bão trên MXH. Đơn cử như trong lần gần nhất với Larry Brown Sport, Anthony Edwards cho biết&nbsp;<a href="https://sport5.vn/the-he-ngoi-sao-tre-nba-tu-tin-truoc-mien-tay-khoi-lua-20230221161107209.htm" target="_blank" title="không cảm thấy ái ngại với những siêu đội hình mới thành lập tại miền Tây" data-rel="follow">không cảm thấy ái ngại với những siêu đội hình mới thành lập tại miền Tây</a>, bao gồm Phoenix Suns và Dallas Mavericks. Cầu thủ 21 tuổi cũng cho rằng tài năng của bản thân có thể sánh ngang cùng với Kevin Durant và Kyrie Irving.</p><p>Thế nhưng đó chưa phải là những phát ngôn gây sốc nhất của cầu thủ có biệt danh "Ant Man". Trong lần trò chuyện mới nhất cùng ký giả Malika Andrews của ESPN, pick 1 2020 khi được hỏi về ý kiến cá nhân cho vị trí số 1 NBA hiện tại đã không ngần ngại nói rằng đó chính là bản thân.</p><div class="VCSortableInPreviewMode" type="VideoStream" embed-type="4" data-width="600px" data-height="400px" data-vid="sport5.mediacdn.vn/158855217956261888/2023/2/23/im-the-best-player-in-the-nba-t-wolves-anthony-edwards-1-on-1-with-malika-andrews-in-nba-today-167713750322118161115.mp4" data-info="75e4a55346d6f49e6b4cd08e8507325d" data-autoplay="false" data-removedlogo="false" data-location="" data-displaymode="0" data-thumb="https://sport5.mediacdn.vn/158855217956261888/2023/2/23/.im-the-best-player-in-the-nba-t-wolves-anthony-edwards-1-on-1-with-malika-andrews-in-nba-today-167713750322118161115.mp4.jpg" data-contentid="" data-namespace="sport5" data-originalid="" videoexternalid="0" id="videoid_19873" videoid="19873"><div class="VideoCMS_Caption"><p class="" data-placeholder="[nhập chú thích]" style="text-align: center;">Cuộc trò chuyện thú vị của NBA Today với Anthony Edwards</p></div></div><p>"Tôi nghĩ về mình. Tôi nghĩ đó chính là tôi bởi vì tôi là một cầu thủ 2-way. Tiêu chuẩn cũng như yêu cầu tôi đặt ra cho bản thân mình cũng cao hơn bất cứ ai", Anthony Edwards chia sẻ trong chương trình NBA Today.</p><p>Tự mãn hay là một kẻ tự tin? Sẽ có 2 cách nhìn về cách thể hiện cá tính của Anthony Edwards. Với những gì chàng cầu thủ trẻ 21 tuổi này thể hiện cho tới hiện tại, có lẽ mọi người sẽ cho rằng Anthony Edwards là một trong những cầu thủ có niềm tin to lớn vào tài năng của bản thân, nhưng cách thể hiện nó đôi khi lại hơi quá cao ngạo.</p><p>Cho tới thời điểm hiện, Anthony Edwards vẫn đang cho thấy bản thân là một trong những ngôi sao trẻ và có khả năng phát triển tại NBA. Ở năm tân binh đầu tiên, cầu thủ thuộc biên chế Minnessota Timberwolves có cho mình trung bình 19.3 điểm, 4.7 rebounds cùng 2.9 kiến tạo, con số đó tiếp tục gia tăng ở mùa thứ 2 với 21.3 điểm, 4.8 rebounds và 3.8 kiến tạo.</p><figure class="VCSortableInPreviewMode" type="Photo" style=""><div><img src="https://sport5.mediacdn.vn/158855217956261888/2023/2/23/getpaidstockcom-63f6f4f71bfa5-16771290337451530820294-1677137483524-16771374835941884288284.jpg" alt="Bất ngờ trước lựa chọn cầu thủ tốt nhất NBA hiện tại của Anthony Edwards - Ảnh 3." title="Bất ngờ trước lựa chọn cầu thủ tốt nhất NBA hiện tại của Anthony Edwards - Ảnh 3." type="photo" style="max-width:100%;" class="" w="1024" h="683" rel="lightbox" data-original="https://sport5.mediacdn.vn/158855217956261888/2023/2/23/getpaidstockcom-63f6f4f71bfa5-16771290337451530820294-1677137483524-16771374835941884288284.jpg" width="" height=""></div><figcaption class="PhotoCMS_Caption"><p data-placeholder="[Nhập chú thích ảnh]">Anthony Edwards cũng Ja Morant đang là hai trong những ngôi sao trẻ tuổi đáng chú ý của NBA</p></figcaption></figure><p>Tại mùa giải 2022/23, sao trẻ của "Bầy sói" tiếp tục cho thấy sự tiến bộ và đang là một trong những tay ghi điểm chủ chốt của đội chủ sân Target Center. Với 24.9 điểm, 5.9 rebounds cùng 4.9 kiến tạo của Ant Mant, Minnessota Timberwolves hiện đang đứng thứ 8 trên BXH miền Tây với thành tích 31 thắng 30 thua.</p><p>Tự tin về bản thân là vậy, nhưng Anthony Edwards cũng cho rằng bản thân cần phải chứng minh nhiều hơn cho phát biểu của bản thân. Trò chuyện cùng Malika, Anthony cho biết anh vẫn chưa nhận được sự công nhận từ phía khán giả.</p><p>"Tôi cảm thấy mình như một kẻ không được công nhận. Tôi là lựa chọn đầu tiên ở kỳ Draft 2020 và mọi người kiểu như không hiểu vì sao tôi lại được đánh giá cao thế. Vì vậy tôi cảm thấy mình vẫn còn điều gì đó cần phải làm tốt hơn để chứng minh".</p><figure class="VCSortableInPreviewMode" type="Photo" style=""><div><img src="https://sport5.mediacdn.vn/158855217956261888/2023/2/23/getpaidstockcom-63f6f4dae5976-16771290339501484450365-1677137485820-1677137485895122798478.jpg" alt="Bất ngờ trước lựa chọn cầu thủ tốt nhất NBA hiện tại của Anthony Edwards - Ảnh 4." title="Bất ngờ trước lựa chọn cầu thủ tốt nhất NBA hiện tại của Anthony Edwards - Ảnh 4." type="photo" style="max-width:100%;" class="" w="1024" h="683" rel="lightbox" data-original="https://sport5.mediacdn.vn/158855217956261888/2023/2/23/getpaidstockcom-63f6f4dae5976-16771290339501484450365-1677137485820-1677137485895122798478.jpg" width="" height=""></div><figcaption class="PhotoCMS_Caption"><p data-placeholder="[Nhập chú thích ảnh]">Anthony Edwards còn nhiều tiềm năng để phát triển trong tương lai</p></figcaption></figure>`,
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
