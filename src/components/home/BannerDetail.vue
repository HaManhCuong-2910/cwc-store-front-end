<template>
  <div class="mt-3">
    <div class="row">
      <div
        class="col-4"
        v-for="item in data"
        :key="item.url"
        ref="BannerProds"
      >
        <div class="card">
          <img
            class="card-img-top"
            :src="item.url"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">
              {{ item.title }}
            </h5>
            <p class="card-text text-start">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  border: none;

  .card-body {
    text-align: center;
  }
}

.card-img-top {
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
}
</style>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import ScrollReveal from 'scrollreveal';

export default defineComponent({
  setup() {
    const BannerProds = ref<any>();

    const data = reactive([
      {
        url: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/77dbf580-d3e9-4db0-8901-72fab0bcbdba/nike-just-do-it.png',
        title:
          'Hướng dẫn cá nhân của bạn để trở nên vĩ đại',
        description: `Ứng dụng Nike có mọi thứ bạn cần để di chuyển.
              Điều đó có nghĩa là thiết bị mới nhất, câu
              chuyện hấp dẫn và cộng đồng trên toàn thế
              giới. Tất cả đều ở đây, được cá nhân hóa cho
              bạn.`,
      },
      {
        url: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/b38f0b02-991b-4ed6-8398-8d619e5d9b9a/nike-app.png',
        title: 'Tham gia vào cộng đồng',
        description: `Khi bạn ở trong ứng dụng, bạn là Thành viên
              của Nike. Vì vậy, bạn sẽ có quyền truy cập đầu
              tiên vào thiết bị mới nhất - cộng với một chỗ
              ngồi ở hàng ghế đầu để trải nghiệm Nike.`,
      },
      {
        url: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/16e2afe9-7657-4976-8b1f-446fbad97e87/nike-app.jpg',
        title: 'Tu Luyện Cho Mọi Thân Tâm',
        description: `Ứng dụng Nike Training Club sẽ giúp thói quen
              tập thể dục của bạn trở nên gắn bó với các tùy
              chọn nhanh hơn, công cụ đặt mục tiêu và nội
              dung mới hàng ngày. Tăng cường tư duy và cơ
              bắp của bạn với sự hướng dẫn miễn phí từ các
              huấn luyện viên, vận động viên và chuyên gia
              chăm sóc sức khỏe yêu thích của bạn.`,
      },
    ]);

    watch(
      () => BannerProds.value,
      () => {
        if (BannerProds.value[0]) {
          BannerProds.value.forEach(
            (element: any, index: number) => {
              ScrollReveal().reveal(element, {
                delay: 200 * index,
                reset: true,
                duration: 1000,
                distance: '150px',
                opacity: 0,
                origin: 'right',
              });
            }
          );
        }
      }
    );
    return {
      data,
      BannerProds,
    };
  },
});
</script>
