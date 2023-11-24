import Vue from 'vue';
import router from '@/router/index';
import ElementUI from 'element-ui';
import App from './App.vue';
import store from './store';


import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
