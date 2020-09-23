import Vue from 'vue'
import App from './App.vue'
import 'normalize.css'
import router from './router'
import store from './store'
import { Checkbox , Layout, Menu, Select, DatePicker, ConfigProvider, Button, Tree, Pagination, Message, Switch, Collapse} from 'ant-design-vue';
import echarts from 'echarts'
import Header from './publicComponets/cephalosome'
import Slider from './publicComponets/sidebar'
import http from './http/api'
import https from 'axios'

// 路由守卫
router.beforeEach((to,from,next)=>{
  if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
    if (sessionStorage['token']) {
      next();
    }else{
      next({
        path:"/"
      });
    }
  }else{
    next()
  }
});

Vue.component(Checkbox.name, Checkbox)
Vue.use(Menu)
Vue.use(Layout)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(ConfigProvider)
Vue.use(Tree)
Vue.use(Switch)
Vue.use(Collapse)
Vue.component(Button.name, Button)
Vue.component(Pagination.name, Pagination)
Vue.component('Header', Header)
Vue.component('Slider', Slider)
Vue.prototype.$message = Message;
Vue.prototype.$axios = https
Vue.prototype.$api = http
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
