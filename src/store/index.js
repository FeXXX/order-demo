import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    // 数据库里的所有数据
    detail:false,//header里的公告详情页状态
    shoppingCarDetail:false,//购物车的详情页状态
    foodInfo:false,//food的详情信息状态
    resume:false,//简历状态
    sellerData:{},//app里获取的seller数据
    goodsData:[],//app里获取的goods数据
    ratingDataList:[],//app里获取的rating数据
    selectedFoodList:[],//选中在购物车里面的数据列表
    picture:false,//图片层的状态
  },
  mutations:{
    // 同步变化函数
    // 显示header里的公告详情页
    showDetail:(state,payload) => {
      state.detail = true;
    },
    // 隐藏header里的公告详情页
    hideDetail:(state,payload) => {
      state.detail = false;
    },
    // 显示购物车里的详情页
    showShoppingCarDetail:(state,payload) => {
      state.shoppingCarDetail = true;
    },
    // 隐藏购物车里的详情页
    hideShoppingCarDetail:(state,payload) => {
      state.shoppingCarDetail = false;
    },
    // 显示food的详情信息页
    showFoodInfo:(state) => {
      state.foodInfo = true;
    },
    // 隐藏food的详情信息页
    hideFoodInfo:(state) => {
      state.foodInfo = false;
    },
    // 显示resume页
    showResume:(state) => {
      state.resume = true;
    },
    // 隐藏resume页
    hideResume:(state) => {
      state.resume = false;
    },
    // 显示图片页
    showPicture:(state) => {
      state.picture = true;
    },
    // 隐藏图片页
    hidePicture:(state) => {
      state.picture = false;
    },
  },
  actions:{
    // 接收指令
    // 显示header里的公告详情页
    showDetail:({commit,state},product) => {
      commit('showDetail')
    },
    // 隐藏header里的公告详情页
    hideDetail:({commit,state},product) => {
      commit('hideDetail')
    },
    // 显示购物车里的详情页
    showShoppingCarDetail:({commit,state},product) => {
      commit('showShoppingCarDetail')
    },
    // 隐藏购物车里的详情页
    hideShoppingCarDetail:({commit,state},product) => {
      commit('hideShoppingCarDetail')
    },
    // 显示food的详情信息页
    showFoodInfo:({commit}) => {
      commit('showFoodInfo');
    },
    // 隐藏food的详情信息页
    hideFoodInfo:({commit}) => {
      commit('hideFoodInfo');
    },
    // 显示resume页
    showResume:({commit}) => {
      commit('showResume');
    },
    // 隐藏resume页
    hideResume:({commit}) => {
      commit('hideResume')
    },
    // 显示图片页
    showPicture:({commit}) => {
      commit('showPicture')
    },
    // 隐藏图片页
    hidePicture:({commit}) => {
      commit('hidePicture')
    }
  },
  getters:{
    // 经过处理的一些数据
    //header里的公告详情页状态
    detail:(state) => {
      return state.detail;
    },
    //购物车的详情页状态
    shoppingCarDetail:(state) => {
      return state.shoppingCarDetail;
    },
    // food的详情信息状态
    foodInfo:(state) => {
      return state.foodInfo;
    },
    //简历状态
    resume:(state) => {
      return state.resume;
    },
    // 图片层状态
    picture:(state) => {
      return state.picture;
    }
  }
});

export default store
