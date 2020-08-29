import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index'
import Login from './views/login'
import Main from './views/home/main'
import Register from './views/register'
import NotFound from './views/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*', // 匹配所有找不到家的孩子
      component: NotFound
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '', // 默认的二级路由  的地址 path为空串
          component: Main
        },
        {
          // path: '/home/comment',
          path: 'comment',
          component: () => import('./views/comment')
        }, {
          path: 'material',
          component: () => import('./views/material')
        },
        {
          // 账户信息
          path: 'account',
          component: () => import('./views/account')
        },
        {
          // 粉丝数据
          path: 'fansdata',
          component: () => import('./views/fans/fansdata')
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
