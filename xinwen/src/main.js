import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'// 框架组件
import Component from './components' // 自定义组件
// import axios from 'axios'
// import axios from './utils/axios.config.js'
import axios from './utils/axios.config.js'
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import './style/index.less'// 引入初始化样式 包括 margin padding li

Vue.config.productionTip = false// 阻止启动生产消息,没有这句代码，它会显示你生产模式的消息
Vue.use(ElementUI)// 全局注册elementUI组件 任意位置都可以使用
Vue.use(Component)// 全局注册自定义组件

Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
