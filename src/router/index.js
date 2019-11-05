import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

import Layout from '@/layout'
import { Message } from 'element-ui'
import getTitle from '@/utils/getTitle'

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/

export const currencyRoutes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    name: 'Goods',
    redirect: '/goods/manage',
    meta: {
      title: '商城管理',
      icon: 'el-icon-goods'
    },
    component: Layout,
    children: [
      {
        path: 'manage',
        name: 'goods-manage',
        component: () => import('@/views/goods/Manage'),
        meta: {
          title: '商品管理'
        }
      },
      {
        path: 'order-detail',
        name: 'order-detail',
        component: () => import('@/views/goods/OrderDetails'),
        meta: {
          title: "订单明细查询"
        },
      },
      {
        path: 'order-sum',
        name: 'order-sum',
        component: () => import('@/views/goods/OrderSum'),
        meta: {
          title: '订单汇总'
        }
      },
      {
        path: 'output',
        name: 'output',
        component: () => import('@/views/goods/OutputStatistic'),
        meta: {
          title: '进销统计报表'
        }
      },
    ]
  },
  // {
  //   path: '/cuisine',
  //   name: 'Cuisine',
  //   redirect: '/cuisine/cusine-manage',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'manage',
  //       name: 'manage',
  //       component: () => import('@/views/cuisine/Manage'),
  //       meta: {
  //         title: '菜品管理',
  //         icon: 'el-icon-food'
  //       }
  //     },
  //   ]
  // },
]
export const asyncRoutes = [

]
const creatRouter = () => {
  return new Router({
    routes: currencyRoutes,
    scrollBehavior() {
      return { x: 0, y: 0 }
    }
  })
}

const router = creatRouter()

// 解决addRoute不能删除动态路由问题
export function resetRouter() {
  const reset = creatRouter()
  router.matcher = reset.matcher
}

// router.beforeEach(async (to, from, next) => {
//   document.title = getTitle(to.meta.title)
//   if (to.path === '/login') {
//     next()
//   } else {
//     if (store.getters.token) {
//       const hasRoles = store.getters.roles.length > 0
//       if (hasRoles) {
//         next()
//       } else {
//         try {
//           const { roles } = await store.dispatch('user/_getInfo')
//           const addRoutes = await store.dispatch(
//             'permission/getAsyncRoutes',
//             roles
//           )
//           router.addRoutes(addRoutes)

//           // hack method to ensure that addRoutes is complete
//           // set the replace: true, so the navigation will not leave a history record
//           next({ ...to, replace: true })
//         } catch (error) {
//           Message.error(error)
//         }
//       }
//     } else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   }
// })

export default router
