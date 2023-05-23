import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index'),
    children: [
      {
        path: '/',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home'),
        meta: {
          name: '首页'
        }
      },
      {
        path: 'usermes',
        name: 'usermes',
        component: () => import('../views/usermes'),
        meta: {
          name: '个人中心'
        }
      },
      {
        path: 'China',
        name: 'China',
        component: () => import('../views/China'),
        meta: {
          name: '热门电影'
        }
      },
      {
        path: 'videos',
        name: 'videos',
        component: () => import('../views/VideoPage'),
        meta: {
          name: '可视化分析'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
