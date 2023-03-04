import store from '@/store/index';
import router from '@/router/index';
import ElementPlus from 'element-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BootstrapVue3 from 'bootstrap-vue-3';
import VueSnip from 'vue-snip';
import ScrollReveal from 'scrollreveal';
import '@/utils/LoadingRouter';

import 'element-plus/dist/index.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import { library } from '@fortawesome/fontawesome-svg-core';

import 'swiper/css';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { setupInterceptors } from '@/api/setupInterceptors';

/* add icons to the library */
library.add(fas, fab, far);
export function registerGlobalComponent(app: any) {
  setupInterceptors(store, router);
  app
    .use(store)
    .use(router)
    .use(VueSnip)
    .use(BootstrapVue3)
    .use(ElementPlus)
    .use(ScrollReveal)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
}
