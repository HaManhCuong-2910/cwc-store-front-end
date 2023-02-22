<template>
  <div class="footer mt-5">
    <div class="container-base pt-4">
      <div class="row">
        <div class="col-md-3">
          <ul>
            <li class="title">HỖ TRỢ KHÁCH HÀNG</li>
            <li>Chính sách vận chuyển và kiểm hàng</li>
            <li>Chính sách thanh toán và khiếu nại</li>
            <li>Chính sách bảo mật thông tin</li>
            <li>Chính sách bảo hành sản phẩm</li>
            <li>Chính sách đổi hàng sản phẩm</li>
          </ul>
        </div>
        <div class="col-md-3">
          <ul>
            <li class="title">CWCSTORE.VN</li>
            <li>
              Vô địch ngay lần đầu tiên ra quân, đội tuyển
              nữ Hà Nội xuất sắc ẵm cup tại HYBC 2022
            </li>
            <li>Hướng dẫn đo size giày bóng rổ</li>
            <li>Đặt may, thiết kế đồng phục bóng rổ</li>
          </ul>
        </div>
        <div class="col-md-3">
          <ul>
            <li class="title">LIÊN HỆ</li>
            <li>Gọi mua hàng : <b>0868 63 65 63</b></li>
            <li>Website: cwcstore.vn</li>
          </ul>
        </div>
        <div class="col-md-3">
          <ul>
            <li class="title">CỬA HÀNG</li>
            <li>
              <b>cwcstore.vn</b> - Chuyên giày bóng rổ, Quần
              áo, Phụ kiện
            </li>
            <li>Địa chỉ : Số 208, Đường Láng , Hà Nội</li>
          </ul>
        </div>
      </div>
      <div class="copy-right mt-5">
        <p>
          <b>Vietnam</b>
          © 2023 Nike, Inc. All Rights Reserved
        </p>

        <p>
          Điện thoại : 0336.272.203 - Email :
          hamanhcuong.gaapnow@gmail.com - Chịu trách nhiệm
          nội dung : Hà Mạnh Cường
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  overflow: hidden;
  background-color: #000;

  ul {
    list-style: none;
    padding: 0px;

    li {
      color: #7e7e7e;
      font-size: 17px;
      transition: 0.3s;
      margin: 10px 0px;

      &.title {
        font-weight: 600;
        font-size: 19px;
        color: #fff;
      }

      &:hover {
        color: #fff;
        cursor: pointer;
      }
    }
  }

  .copy-right {
    display: flex;
    justify-content: space-between;

    p {
      color: #fff;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  setup() {},
});
</script>
