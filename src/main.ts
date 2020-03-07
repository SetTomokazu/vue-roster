import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale";
import lang from "element-ui/lib/locale/lang/ja";
Vue.config.productionTip = false;

locale.use(lang);
Vue.use(ElementUI, { locale });

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
