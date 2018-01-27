import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import goodsView from '../components/content/goods/goodsView'
import sellerView from '../components/content/seller/sellerView'
import ratingView from '../components/content/rating/ratingView'



const router =  new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: '',
  routes: [
    {
      name:'default',
      path: '/',
      redirect:'/goods'
    },
    {
      name:'reset',
      path: '*',
      redirect:'/goods'
    },
    {
      name:'goods',
      path: '/goods',
      component:goodsView
    },
    {
      name:'seller',
      path: '/seller',
      component:sellerView
    },
    {
      name:'rating',
      path: '/rating',
      component:ratingView
    },
  ]
});

export default router;
