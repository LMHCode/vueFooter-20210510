import VueRouter from 'vue-router'
import Vue from 'vue'
import { changeThemes } from '../src/untils/changeTheme.js'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/view/home/index'),
    },
    {
      path: '/my',
      component: () => import('@/view/my/index'),
    }
    // ,
    // {
    //   path: '/user/:id',
    //   component: User,
    //   children: [
    //     {
    //       // 当 /user/:id/profile 匹配成功，
    //       // UserProfile 会被渲染在 User 的 <router-view> 中
    //       path: 'profile',
    //       component: UserProfile
    //     },
    //     {
    //       // 当 /user/:id/posts 匹配成功
    //       // UserPosts 会被渲染在 User 的 <router-view> 中
    //       path: 'posts',
    //       component: UserPosts
    //     }
    //   ]
    // }
  ]
})

router.beforeEach((to, from, next) => {
  let mode = localStorage.getItem('mode') || 'red'
  changeThemes(mode)
  next()
})

export default router