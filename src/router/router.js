import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Reg from '../components/reg.vue'
import ActiveUser from '../components/activeUser.vue'
import ModifyEmail from '../components/modifyEmail.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Setting from '../components/common/setting.vue'
import User from '../components/common/user.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/reg', component: Reg }, 
  { path: '/activeUser/:email', component: ActiveUser, props: true },
  { path: '/modifyEmail/:email', component: ModifyEmail, props: true },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/setting', component: Setting },
      { path: '/user', component: User }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})
router.beforeEach((to, from, next) => {
  // to 将要访问的页面
  // from 代表从哪个路径跳转过来
  // next 是一个函数，表示放行
  //       next()放行，next('/login') 强制跳转到指定页面
  console.log(to.path)
  const activeUserPath = /^\/activeUser\/+[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+.)+[A-Za-z]{2,6}$/
  const modifyEmailPath = /^\/modifyEmail\/+[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+.)+[A-Za-z]{2,6}$/
  if (to.path === '/login') return next() // 将要访问的页面是登录页面，放行
  if (to.path === '/reg') return next() // 将要访问的页面是注册页面，放行
  // if (to.path === '/activeUser') return next() // 将要访问的页面是注册页面，放行
  if (activeUserPath.test(to.path)) return next() // 将要访问的页面是注册页面，放行
  if (modifyEmailPath.test(to.path)) return next() // 将要访问的页面是注册页面，放行
  const tokenStr = window.sessionStorage.getItem('token') // 获取 token
  if (!tokenStr) return next('/login') // 无token，表示未登录，跳转到 login 页面
  next()
})
export default router
