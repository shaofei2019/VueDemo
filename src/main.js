import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import axios from 'axios'
import router from './router/router.js'
import './plugin/elements.js'

axios.defaults.baseURL = 'http://localhost:8090/'
Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
  router,
  render: a => a(App)
}).$mount('#app')
