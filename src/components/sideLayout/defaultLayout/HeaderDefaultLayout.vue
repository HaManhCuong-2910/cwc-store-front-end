<template>
  <b-navbar toggleable="lg" class="container-base">
    <b-navbar-brand>
      <router-link to="/"
        ><img
          src="@/assets/images/logo.png"
          alt="logo"
          class="logo-home"
      /></router-link>
    </b-navbar-brand>
    <b-navbar-toggle
      target="nav-collapse"
    ></b-navbar-toggle>
    <b-collapse
      id="nav-collapse"
      class="justify-content-between nav-bar-custom"
      is-nav
    >
      <b-navbar-nav>
        <b-nav-text
          v-for="(category, index) in data.listCategory"
          :key="index"
          class="nav-item"
        >
          <router-link
            class="nav-item-menu"
            :to="`/${category.slug}`"
            exact
          >
            {{ category.name }}
          </router-link>
          <ul
            v-if="category.child.length > 0"
            class="child-nav"
          >
            <li
              v-for="(item, index) in category.child"
              :key="index"
            >
              <router-link
                :to="`/giay-bong-ro/${item.slug}`"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </b-nav-text>
      </b-navbar-nav>
      <div class="child-components">
        <InputSearchNav />
        <router-link
          :to="{
            name: 'CartPage',
          }"
        >
          <el-badge
            :value="numberOrderCart"
            class="cart-icon"
          >
            <font-awesome-icon
              class="icon"
              icon="fa-solid fa-bag-shopping"
            />
          </el-badge>
        </router-link>
        <router-link
          :to="{
            name: 'Login',
          }"
          v-show="!data.isLoginUser"
        >
          <font-awesome-icon
            class="icon"
            icon="fa-solid fa-user"
          />
        </router-link>
        <div v-show="data.isLoginUser">
          <el-dropdown :hide-on-click="true">
            <el-avatar
              class="custom-size-avatar"
              :src="data.userAvatar"
            />
            <template #dropdown>
              <el-dropdown-menu>
                <router-link
                  :to="{
                    name: 'userInfo',
                  }"
                  ><el-dropdown-item
                    >Thông tin tài khoản</el-dropdown-item
                  ></router-link
                >
                <el-dropdown-item @click="handleLogout"
                  >Đăng xuất</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </b-collapse>
  </b-navbar>
</template>

<style lang="scss" scoped>
.logo-home {
  width: 140px;
  height: 48px;
}
.nav-bar-custom {
  height: 70px;

  .nav-item {
    position: relative;
    transform-origin: center center;
    margin: 0px 20px;

    .child-nav {
      display: none;
    }

    &::after {
      position: absolute;
      z-index: 10000;
      content: '';
      display: none;
      bottom: 0px;
      width: 100%;
      height: 2px;
      background-color: #7f8c8d;
      transform-origin: center center;
      animation: AShowEffectNavItem linear 0.3s;
    }

    &:hover {
      &::after {
        display: block;
      }

      .child-nav {
        z-index: 1000;
        background-color: #fff;
        overflow: hidden;
        position: absolute;
        display: block;
        animation: AShowChildNav ease-in 0.3s;
        top: 100%;
        list-style: none;
        border-radius: 10px;
        padding: 0px;
        width: 200px;
        display: block;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
          rgba(17, 17, 26, 0.1) 0px 16px 56px,
          rgba(17, 17, 26, 0.1) 0px 24px 80px;

        li {
          padding: 10px;
          border-bottom: 1px solid #bdc3c7;
          &:hover {
            background-color: #ecf0f1;
          }

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }

    &:has(a.router-link-active) {
      &::after {
        display: block;
      }
    }
  }
}

.custom-size-avatar {
  width: 30px;
  height: 30px;
  margin-left: 14px;
}

.child-components {
  display: flex;
  align-items: center;

  svg {
    &.icon {
      font-size: 26px;
      margin-left: 20px;
      color: #7f8c8d;
    }
  }
}

@keyframes AShowChildNav {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes AShowEffectNavItem {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { getListCategory } from '@/api/category/index';
import InputSearchNav from '@/components/sideLayout/defaultLayout/child-components/InputSearchNav.vue';
import { AxiosResponse } from 'axios';
import { useStore } from 'vuex';
import { Quantity, TProduct } from '@/api/products/data';
import router from '@/router';
import { fa } from 'element-plus/es/locale';
import { AvatarUserDefault } from '@/constant/constant';
type THeaderData = {
  listCategory: any[] | AxiosResponse<any[], any>;
  isLoginUser: boolean;
  userAvatar: string;
};

export default defineComponent({
  components: {
    InputSearchNav,
  },
  setup() {
    const store = useStore();

    const { cart, user } = store.state;

    const numberOrderCart = ref<number>(cart.length);

    const data: THeaderData = reactive({
      listCategory: [],
      isLoginUser: user?._id ? true : false,
      userAvatar: user?.avatar
        ? user.avatar
        : AvatarUserDefault,
    });

    watch(
      () => cart,
      (value) => {
        let sumOrderCart = 0;
        cart.forEach((item: Quantity) => {
          sumOrderCart += item.quantity;
        });
        numberOrderCart.value = sumOrderCart;
        sessionStorage.setItem(
          'cart',
          JSON.stringify(cart)
        );
      },
      { deep: true }
    );

    watch(
      () => store.state.user,
      (value) => {
        if (store.state.user) {
          data.isLoginUser = true;
          data.userAvatar = store.state.user.avatar
            ? store.state.user.avatar
            : AvatarUserDefault;
        } else {
          data.isLoginUser = false;
        }
      },
      { deep: true }
    );

    onMounted(async () => {
      data.listCategory = (await getListCategory()).data;
      let sumOrderCart = 0;
      cart.forEach((item: Quantity) => {
        sumOrderCart += item.quantity;
      });
      numberOrderCart.value = sumOrderCart;
      sessionStorage.setItem('cart', JSON.stringify(cart));
    });

    const handleLogout = () => {
      store.commit('logOut');
      router.push('/');
    };
    return {
      data,
      numberOrderCart,
      handleLogout,
      AvatarUserDefault,
    };
  },
});
</script>
