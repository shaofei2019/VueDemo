import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // to 将要访问的页面
  // from 代表从哪个路径跳转过来
  // next 是一个函数，表示放行
  //       next()放行，next('/login') 强制跳转到指定页面
  if (to.path === '/login') return next() // 将要访问的页面是登录页面，放行
  const tokenStr = window.sessionStorage.getItem('token') // 获取 token
  if (!tokenStr) return next('/login') // 无token，表示未登录，跳转到 login 页面
  next()
})
export default router
