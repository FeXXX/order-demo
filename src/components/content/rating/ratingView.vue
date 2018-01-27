<template>
    <div id="ratingView">
      <!--评论区窗口-->
      <div class="rating-wrapper">
        <div class="rating-content">
          <div class="left">
            <div class="average">{{mySellerData.score}}</div>
            <div class="title">综合评分</div>
            <div class="comment">高于周边商家{{mySellerData.rankRate}}%</div>
          </div>
          <div class="right">
            <div class="service-score">
              <span class="title">服务态度</span>
              <div class="starView-wrapper">
                <starView :starScore="mySellerData.serviceScore" :starSize="36"></starView>
              </div>
              <div class="score">{{mySellerData.serviceScore}}</div>
            </div>
            <div class="food-score">
              <span class="title">商品评价</span>
              <div class="starView-wrapper">
                <starView :starScore="mySellerData.foodScore" :starSize="36"></starView>
              </div>
              <div class="score">{{mySellerData.foodScore}}</div>
            </div>
            <div class="delivery-time">
              送达时间
              <span>{{mySellerData.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <!--分隔快-->
        <divideBlockView></divideBlockView>
        <!--评论控制块-->
        <div class="ratingControlView-wrapper">
          <ratingControlView
            :chooseType="chooseType" @on-chooseType-change="onChooseTypeChange"
            :filter="filter" @on-filter-change="onFilterChange">
          </ratingControlView>
        </div>
        <!--评论列表-->
        <div class="rating-list">
          <ul>
            <li class="rating-item" v-for="item of selectedRatingList">
              <div class="head">
                <div class="avatar">
                  <img :src="item.avatar" alt="">
                </div>
                <div class="user-message">
                <div class="user-info">
                  <div class="user-name">{{item.username}}</div>
                  <div class="date">{{item.rateTime | formatDate}}</div>
                </div>
                <div class="star-wrapper">
                  <starView :starScore="item.score" :starSize="24"></starView>
                  <span class="delivery-time">{{item.deliveryTime}}分钟送达</span>
                </div>
              </div>
              </div>
              <div class="content">{{item.text}}</div>
              <div class="foot">
                <span class="glyphicon" :class="recommndClassesList[item.rateType]"></span>
                <ul class="recommend-list">
                  <li v-for="recommend of item.recommend" class="recommend-item">{{recommend}}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--遮罩层-->
      <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
        <maskView v-show="maskCtrl"></maskView>
      </transition>
      <!--购物车块-->
      <shoppingCarView :selectedFoodInfoList="selectedFoodList"></shoppingCarView>
    </div>
</template>

<script>
  import shoppingCarView from '../../public/shoppingCar/shoppingCarView'
  import starView from '../../public/star/starView'
  import divideBlockView from '../../public/divideBlock/divideBlockView'
  import ratingControlView from '../../public/ratingControl/ratingControlView'
  import maskView from '../../public/mask/maskView'

  export default {
    name: "rating-view",
    components:{
      shoppingCarView,
      starView,
      divideBlockView,
      ratingControlView,
      maskView
    },
    data(){
      return {
        // 用于此组件的seller数据
        mySellerData: {},
        // 用于此组件的rating数据
        myRatingDataList: [],
        // recommend里点赞图标class
        recommndClassesList:['glyphicon-thumbs-up','glyphicon-thumbs-down'],
        // 用于传递给ratingControl的chooseType，改变后，根据此值筛选rating
        chooseType:-1,
        // 用于传递给ratingControl的filter，改变后，根据此值是否筛选空值
        filter:false,
      }
    },
    computed:{
      // 从store获取的选中的food数据
      selectedFoodList(){
        return this.$store.state.selectedFoodList;
      },
      // 遮罩层的开关
      maskCtrl(){
        return this.$store.getters.shoppingCarDetail;
      },
      // 经过ratingControl筛选的rating数据
      selectedRatingList(){
        let arr = [];
        if(this.chooseType == -1){
          if(this.filter == true){
            this.myRatingDataList.forEach((item) => {
              if(item.text != ''){
               arr.push(item);
              }
            });
          }else{
            arr = this.myRatingDataList;
          }
        }
        this.myRatingDataList.forEach((item) => {
          if(item.rateType == this.chooseType){
            if(this.filter == true){
              if(item.text != ''){
                arr.push(item)
              }
            }else{
              arr.push(item);
            }
          }
        });
        // console.log(arr);
        return arr;
      },
    },
    methods:{
      getSellerData(){
        this.mySellerData = this.$store.state.sellerData;
      },
      getRatingData(){
        this.myRatingDataList = this.$store.state.ratingDataList;
      },
      // 接收ratingControl组件改变的myChooseType并赋值改变给这里的chooseType
      onChooseTypeChange(val){
        this.chooseType = val;
      },
      // 接收ratingControl组件改变的myFilterNull并赋值改变给这里的filterNull
      onFilterChange(val){
        this.filter = val;
      },
    },
    created(){
      this.getSellerData();
      this.getRatingData();
    }
  }
</script>

<style scoped lang="less">
  @r:750/10rem;

  #ratingView {
    .rating-wrapper {
      /*background-color: dimgray;*/
      position: absolute;
      top: 350/@r;
      bottom: 92/@r;
      left: 0;
      right: 0;
      overflow: auto;
      .rating-content {
        background-color: lightyellow;
        padding: 36/@r 0 36/@r 0;
        display: flex;
        .left {
          /*background-color: pink;*/
          width: 35%;
          text-align: center;
          border-right: 1px solid #F3F5F7;
          .average {
            /*background-color: brown;*/
            margin-bottom: 12/@r;
            line-height: 56/@r;
            font-size: 48/@r;
            color: rgb(255,153,0);
          }
          .title  {
            /*background-color: yellow;*/
            margin-bottom: 16/@r;
            line-height: 24/@r;
            font-size: 24/@r;
            color: #07111B;
          }
          .comment {
            /*background-color: palevioletred;*/
            margin-bottom: 12/@r;
            line-height: 20/@r;
            font-size: 20/@r;
            color: #93999F;
          }
        }
        .right {
          /*background-color: white;*/
          flex: 1;
          padding: 0 48/@r 0 48/@r;
          .service-score,.food-score {
            /*background-color: pink;*/
            margin-bottom: 16/@r;
            display: flex;
            line-height: 36/@r;
            font-size: 24/@r;
            .title {
              /*background-color: yellow;*/
              margin-right: 24/@r;
              color: rgb(7,17,27);
            }
            .starView-wrapper {
              /*background-color: palevioletred;*/
              flex: 1;
            }
            .score {
              /*background-color: orange;*/
              margin-left: 24/@r;
              color: rgb(147,153,159);
            }

            }
          .delivery-time {
            line-height: 36/@r;
            font-size: 24/@r;
            color: rgb(7,17,27);
            span {
              margin-left: 24/@r;
              color: rgb(147,153,159);
            }
          }
        }
      }
      .ratingControlView-wrapper {
        margin: 36/@r 36/@r 0 36/@r ;
      }
      .rating-list {
        /*background-color: pink;*/
        border-top: 1px solid #E6E7E8;
        .rating-item {
          /*background-color: yellow;*/
          margin: 36/@r;
          border-bottom: 1px solid #E6E7E8;
          .head {
            /*background-color: orange;*/
            display: flex;
            .avatar {
              width: 56/@r;
              height: 56/@r;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .user-message {
              /*background-color: greenyellow;*/
              width: 100%;
              margin-left: 24/@r;
              .user-info {
                /*background-color: pink;*/
                display: flex;
                justify-content: space-between;
                line-height: 24/@r;
                font-size: 20/@r;
                .user-name {
                  /*background-color: gray;*/
                  color: rgb(7,17,27);
                }
                .date {
                  /*background-color: mediumpurple;*/
                  color: rgb(147,153,159);
                }
              }
              .star-wrapper {
                /*background-color: palevioletred;*/
                margin-top: 8/@r;
                display: flex;
                align-items: center;
                .delivery-time {
                  margin-left: 12/@r;
                  line-height: 24/@r;
                  font-size: 20/@r;
                  font-weight: 200;
                  color: rgb(147,153,159);
                }
              }
            }
          }
          .content {
            /*background-color: sandybrown;*/
            margin: 12/@r 18/@r 16/@r 80/@r;
            line-height: 36/@r;
            font-size: 24/@r;
            color: rgb(7,17,27);
          }
          .foot {
            /*background-color: white;*/
            margin-left: 80/@r;
            display: flex;
            span {
              line-height: 32/@r;
              font-size: 24/@r;
              color: rgb(0,160,200);
            }
            .recommend-list {
              /*background-color: pink;*/
              display: flex;
              flex-wrap: wrap;
              overflow: auto;
              .recommend-item {
                width: 124/@r;
                height: 30/@r;
                margin-left: 16/@r;
                margin-bottom: 16/@r;
                padding: 0 12/@r 0 12/@r;
                line-height: 32/@r;
                font-size: 18/@r;
                text-align: center;
                color: rgb(147,153,159);
                border: 1px solid rgba(7,17,27,0.1);
                border-radius: 2px;
                background-color: #fff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }

          }
        }
      }
    }




  }

</style>
