<template>
    <div id="foodInfoView">
      <!--左上角关闭按钮-->
      <div class="close-button" @click="close">
        <span class="glyphicon glyphicon-menu-left"></span>
      </div>
      <!--图片-->
      <div class="image-wrapper">
        <img :src="thisFoodInfo.image" :alt="thisFoodInfo.name">
      </div>
      <!--商品名称-->
      <div class="food-info">
        <div class="title">
          {{thisFoodInfo.name}}
        </div>
        <div class="extra">
          <span class="sellCount">月售{{thisFoodInfo.sellCount}}份</span>
          <span>好评率{{thisFoodInfo.rating}}%</span>
        </div>
        <div class="price">
          <span class="nowPrice"><i>¥</i>{{thisFoodInfo.price}}</span>
          <span class="oldPrice" v-if="thisFoodInfo.oldPrice"><i>¥</i>{{thisFoodInfo.oldPrice}}</span>
        </div>
        <div class="buy-wrapper">
          <div class="buy-button" @click="buy()" v-show="buyBtnCtrl">加入购物车</div>
          <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
            <shoppingCarControlView class="animated" :foodInfo="thisFoodInfo" v-show="shoppingCarControlViewCtrl"></shoppingCarControlView>
          </transition>
          </div>
      </div>
      <!--分隔快-->
      <divideBlockView></divideBlockView>
      <!--商品介绍-->
      <div class="introduce">
        <div class="title">商品介绍</div>
        <p class="content">{{thisFoodInfo.info}}</p>
      </div>
      <!--分隔快-->
      <divideBlockView></divideBlockView>
      <!--商品评价-->
      <div class="rating">
        <div class="title">商品评价</div>
        <div class="ratingControlView-wrapper">
          <ratingControlView
            :chooseType="chooseType" @on-chooseType-change="onChooseTypeChange"
            :filter="filter" @on-filter-change="onFilterChange">
          </ratingControlView>
        </div>
        <div class="rating-content">
          <ul>
            <li v-for="item of selectedRatingList">
              <div class="title clearfix">
                <span class="date">{{item.rateTime | formatDate}}</span>
                <div  class="avatar">
                  <img :src="item.avatar" alt="avatar">
                </div>
                <span class="user">{{item.username}}</span>
              </div>
              <div class="content">
                <span class="glyphicon glyphicon-thumbs-up" v-show="item.rateType === 0"></span>
                <span class="glyphicon glyphicon-thumbs-down" v-show="item.rateType === 1"></span>
                {{item.text}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    import shoppingCarControlView from '../public/shoopingCarControl/shoppingCarControlView'
    import divideBlockView from '../public/divideBlock/divideBlockView'
    import ratingControlView from '../public/ratingControl/ratingControlView'
    // import {formatDate} from '../../assets/js/formatDate';
    export default {
      name: "food-info-view",
      components: {
        // 购物成控制块
        shoppingCarControlView,
        // 分隔块
        divideBlockView,
        // 评论列表控制块
        ratingControlView
      },
      props:{
        thisFoodInfo:{
          type:Object
        }
      },
      data(){
        return {
          buyBtnCtrl:true, //加入购物车按钮开关
          shoppingCarControlViewCtrl:false,//购物车控制块开关
          // 传给ratingControl，响应值变化后，根据此值筛选rating，默认-1全选
          chooseType:-1,
          // 传给ratingControl，响应变化后，根据此值判断是否筛选掉空的rating，默认false不筛选
          filter:false,
        }
      },
      computed:{
        // 经筛选过的评论
        selectedRatingList(){
          let arr = [];
          this.thisFoodInfo.ratings.forEach((item) => {
            // 筛选符合chooseType的
            if(item.rateType === this.chooseType){
              // filter为true时，过滤
              if(this.filter){
                if(item.text != ''){
                  arr.push(item)
                }
                // filter为false时，不过滤
              }else{
                arr.push(item);
              }
            }

            // 当chooseType为-1时，全选
            if(this.chooseType === -1){
              // filter为true时，过滤
              if(this.filter){
                if(item.text != ''){
                  arr.push(item);
                }
                // filter为false时，不过滤
              }else{
                arr.push(item);
              }
            }
          });
          return arr;
        }

      },
      methods:{
        // 关闭food详情页
        close(){
          this.$store.dispatch('hideFoodInfo')
        },
        // 加载时对页面进行一些初始化
        init(){
          if(this.thisFoodInfo.count === 0){
            this.buyBtnCtrl = true;
            this.shoppingCarControlViewCtrl = false;
          }else{
            this.buyBtnCtrl = false;
            this.shoppingCarControlViewCtrl = true;
          }
        },
        // 隐藏加入购物车按钮，显示购物车控制块
        buy(){
          this.buyBtnCtrl = false;
          this.shoppingCarControlViewCtrl = true;
        },
        // 给每个food数据里加一个chooseType属性用于筛选评论
        setChooseType(){
          this.$set(this.thisFoodInfo,'chooseType',-1);
          this.$set(this.thisFoodInfo,'filterNull',false);
        },
        // 接收ratingControl组件改变的myChooseType并赋值改变给这里的chooseType
        onChooseTypeChange(val){
          this.chooseType = val;
          // console.log(this.chooseType);
        },
        // 接收ratingControl组件改变的myFilterNull并赋值改变给这里的filterNull
        onFilterChange(val){
          this.filter = val;
          // console.log(this.filter);
        }

      },
      created(){
        this.init();
        this.setChooseType();
      },

    }
</script>

<style scoped lang="less">
  @r:750/10rem;

  #foodInfoView {
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 96/@r;
    z-index: 100;
    overflow: auto;
    .close-button {
      background-color: rgba(0,0,0,0.2);
      width: 100/@r;
      height: 60/@r;
      position: fixed;
      left: 0;
      top: 0;
      padding-left: 20/@r;
      span {
        font-size: 60/@r;
        color: rgba(255,255,255,0.6);
      }
    }
    .image-wrapper {
      /*background-color: pink;*/
      width: 100%;
      img {
        width: 100%;
      }
    }
    .food-info {
      padding: 36/@r;
      position: relative;
      .title {
        /*background-color: orange;*/
        line-height: 28/@r;
        font-size: 28/@r;
        font-weight: 700;
        color: rgb(7,17,27);
      }
      .extra {
        /*background-color: lightskyblue;*/
        margin-top: 16/@r;
        line-height: 20/@r;
        font-size: 20/@r;
        color: rgb(147,153,159);
        .sellCount {
          /*background-color: yellow;*/
          margin-right: 24/@r;
        }

      }
      .price {
        /*background-color: violet;*/
        margin-top: 36/@r;
        .nowPrice {
          line-height: 48/@r;
          font-size: 28/@r;
          font-weight: 700;
          color: rgb(240,20,20);
          i {
            font-size: 20/@r;
            font-weight: normal;
          }
        }
        .oldPrice {
          margin-left: 16/@r;
          line-height: 48/@r;
          font-size: 20/@r;
          font-weight: 700;
          color: rgb(147,153,159);
          text-decoration: line-through;
          i {
            font-weight: normal;
          }
        }
      }
      .buy-wrapper {
        /*background-color: violet;*/
        position: absolute;
        right: 36/@r;
        bottom: 36/@r;
        .buy-button {
          background-color: rgb(0,160,200);
          width: 148/@r;
          height: 48/@r;
          border-radius: 24/@r;
          padding: 12/@r 24/@r;
          line-height: 24/@r;
          font-size: 18/@r;
          font-weight: 700;
          color: rgb(255,255,255);
        }
      }

    }
    .introduce {
      /*background-color: pink;*/
      padding: 36/@r;
      .title {
        /*background-color: blanchedalmond;*/
        line-height: 28/@r;
        font-size: 28/@r;
        font-weight: 700;
        color: rgb(7,17,27);
      }
      .content {
        /*background-color: greenyellow;*/
        padding: 12/@r 16/@r 0 16/@r;
        line-height: 48/@r;
        font-size: 24/@r;
      }

    }
    .rating {
      /*background-color: sandybrown;*/
      .title {
        /*background-color: palevioletred;*/
        padding: 36/@r;
        line-height: 28/@r;
        font-size: 28/@r;
        font-weight: 700;
        color: rgb(7,17,27);
      }
      .ratingControlView-wrapper {
        /*background-color: gray;*/
        padding: 0 36/@r 0 36/@r;
      }
      .rating-content {
        /*background-color: lightgoldenrodyellow;*/
        padding: 0 36/@r 0 36/@r;
        border-top: 1px solid rgba(7,17,27,0.1);
        ul {
          li {
            /*background-color: lightpink;*/
            border-bottom: 1px solid rgba(7,17,27,0.1);
            .title {
              /*background-color: yellowgreen;*/
              padding: 32/@r 0 12/@r 0;
              .date,.user {
                /*background-color: orangered;*/
                float: left;
                line-height: 24/@r;
                font-size: 20/@r;
                color: rgb(147,153,159);
              }
              .user {
                /*background-color: brown;*/
                float: right;
              }
              .avatar {
                width: 24/@r;
                height: 24/@r;
                border-radius: 50%;
                float: right;
                margin-left: 12/@r;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .content {
              /*background-color: cornflowerblue;*/
              line-height: 32/@r;
              font-size: 20/@r;
              color: rgb(7,17,27);
              span {
                line-height: 48/@r;
                font-size: 24/@r;
                vertical-align: middle;
                color: rgb(17,153,159);
              }
            }
          }
        }
      }
    }
  }

</style>
