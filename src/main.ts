import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VueI18n from 'vue-i18n'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const locale = navigator.language

Vue.use(VueI18n)
Vue.use(Antd)

const i18n = new VueI18n({
  fallbackLocale: 'en',
  locale
})

Vue.config.productionTip = false
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
