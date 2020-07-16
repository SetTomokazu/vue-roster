import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale'
import lang from 'element-ui/lib/locale/lang/ja'

Vue.config.productionTip = false

locale.use(lang)
Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
