<template>
  <div id="app" v-if="mySellerData">
    <!--简历-->
    <transition leave-active-class="zoomOut">
      <resumeView class="animated" v-show="resumeCtrl"></resumeView>
    </transition>
    <!--头部-->
    <headerView :headerData="mySellerData"></headerView>
    <!--导航-->
    <navView></navView>
    <!--内容-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import resumeView from './components/resume/resumeView'
  import headerView from './components/header/headerView'
  import navView from './components/nav/navView'

  export default {
    name: 'app',
    components:{
      resumeView,
      headerView,
      navView,
    },
    data(){
      return {
        //先设置一个空值，在有确切数据赋值后在渲染模板
        mySellerData:{},
      }
    },
    computed:{
      // resume的开关
      resumeCtrl(){
        return this.$store.getters.resume;
      },
      //从store获取seller的数据
      sellerData(){
        return this.$store.state.sellerData;
      }
  },
    methods:{
      // 显示resume页
      showResume(){
        this.$store.dispatch('showResume');
      },
      // ajax获取所有数据并存入store供使用
      getAndSaveDataToStore(){
        this.$http.get('../static/data.json').then((res) => {
          // 把数据放在store里面供其他组件获取
          this.$store.state.sellerData = res.data.seller;
          this.$store.state.goodsData = res.data.goods;
          this.$store.state.ratingDataList = res.data.ratings;
        })
      },
    },
    created(){
      this.getAndSaveDataToStore();
    },
    mounted(){
      this.showResume();
    },
    watch:{
      // store中的sellerData完成改变后，再赋值给这里的数据供模板渲染或传值
      sellerData(val){
        this.mySellerData = val;
      }
    }
  }
</script>

<style lang="less">
  @import "./assets/css/reset.css";
</style>
