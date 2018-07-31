import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'  //登录页面
    },
    {
      path:'/home',
      component:resolve =>require(['../components/common/Home.vue'],resolve), //主页面
      children:[
        {
          path: '/inventoryManagement',                                                             // 库存管理
          component:resolve =>require(['../components/page/InventoryManagement.vue'],resolve),
        },
        {
          path: '/addDevice',                                                             // 设备添加
          component:resolve =>require(['../components/page/AddDevice.vue'],resolve),
        },
        {
          path: '/inventoryDetails',                                                             // 库存详情
          component:resolve =>require(['../components/page/InventoryDetails.vue'],resolve),
          name:'inventoryDetails'
        },
        {
          path: '/positionTrailing',                                                             // 位置跟踪
          component:resolve =>require(['../components/page/PositionTrailing.vue'],resolve),
        },
        {
          path: '/humitureSupervision',                                                             // 位置跟踪
          component:resolve =>require(['../components/page/HumitureSupervision.vue'],resolve),
        },
      ]


    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve) //重新定向页面
    },
  ]
})
