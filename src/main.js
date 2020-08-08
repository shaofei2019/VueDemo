import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import axios from 'axios'
import router from './router/router.js'
import './plugin/elements.js'

axios.defaults.baseURL = 'http://192.168.0.102:8090/'
// 为每一个请求添加拦截器，设置请求头中的 Authorization 值为 token
axios.interceptors.request.use(config => {
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('stoken');
  return config
}, err => {
  console.log(err);
})
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.bus = new Vue() // 此处全局注册一个Vue，作为事件中心
new Vue({
  router,
  render: a => a(App)
}).$mount('#app')
