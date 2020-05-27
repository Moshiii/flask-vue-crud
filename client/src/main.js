import VueCodemirror from 'vue-codemirror';
import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import router from './router';

import Header from './components/shared/Header.vue';
import Footer from './components/shared/Footer.vue';

import 'codemirror/lib/codemirror.css';

Vue.use(Antd);

Vue.use(VueCodemirror, {
  options: {
    theme: 'base16-dark',
  },
});

Vue.config.productionTip = false;

Vue.component('Header', Header);
Vue.component('Footer', Footer);

new Vue({
  render: (h) => h(App),
  router,
  components: { App },
}).$mount('#app');
