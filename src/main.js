// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import $ from 'jquery'
import animate from 'animate.css'
import filter from './filter/index'


import axios from 'axios'
import store from './store/index'
import './assets/js/init'

// 录入全局filter
Vue.filter('formatDate',filter.getDate);



Vue.use(animate);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
