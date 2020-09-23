import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
      // 登录
  {
    path: '/',
    name: 'register',
    component: () => import('../components/register')
  },
      // 首页
    {
      path: '/homePage',
      name: 'homePage',
      meta: { isLogin:true },
      component: () => import('../components/homePage'),
    },
      // 数据监控
    {
      path: '/monitoring',
      name: 'monitoring',
      meta: { isLogin:true },
      component: () => import('../components/monitoring'),
    },
      // 数据分析
    {
      path: '/dataAnalyze',
      name: 'dataAnalyze',
      meta: { isLogin:true },
      component: () => import('../components/dataAnalyze'),
    },
      // 导出数据
    {
      path: '/deriveData',
      name: 'deriveData',
      meta: { isLogin:true },
      component: () => import('../components/deriveData'),
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
