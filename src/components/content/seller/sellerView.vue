<template>
    <div id="sellerView" v-if="mySellerData">
      <!--商家页窗口-->
      <div class="seller-wrapper">
        <!--商家头部-->
        <div class="seller-title">
          <div class="title-top">
            <div class="name">{{mySellerData.name}}</div>
            <div class="description">
              <!--<div class="star-wrapper">-->
                <starView :star-score="mySellerData.score" :star-size="36"></starView>
              <!--</div>-->
              <div class="population">(661)</div>
              <div class="order-count">月售690单</div>
            </div>
            <div class="collect" @click="toggleCollectState">
              <span class="glyphicon glyphicon-heart" :class="{active:collectStateCtrl}"></span>
              <div class="state">{{collectState}}</div>
            </div>
          </div>
          <div class="title-bottom">
            <div class="min-price">
              <div class="title">起送价</div>
              <div class="price">{{mySellerData.minPrice}}<span>元</span></div>
            </div>
            <div class="deliveryPrice">
              <div class="title">商家配送</div>
              <div class="price">{{mySellerData.deliveryPrice}}<span>元</span></div>
            </div>
            <div class="deliveryTime">
              <div class="title">平均配送时间</div>
              <div class="price">{{mySellerData.deliveryTime}}<span>分钟</span></div>
            </div>

          </div>
        </div>
        <!--分隔组件-->
        <divideBlockView></divideBlockView>
        <!--商家公告与活动-->
        <div class="seller-notice">
          <div class="title">公告与活动</div>
          <p class="content">{{mySellerData.bulletin}}</p>
          <div class="support-list">
            <ul>
                <li class="support-item" v-for="item of mySellerData.supports">
                  <div class="icon" :class="supportsIconClassList[item.type]"></div>
                  <div class="description">{{item.description}}</div>
                </li>
            </ul>
          </div>
        </div>
        <!--分隔组件-->
        <divideBlockView></divideBlockView>
        <!--商家实景-->
        <div class="seller-pic">
          <div class="title">商家实景</div>
          <div class="pic-wrapper">
            <div class="pic-list">
              <ul>
                <li class="pic-item" v-for="(item,index) of mySellerData.pics">
                  <img :src="item" alt="" @click="showPicture(item)">
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--分隔组件-->
        <divideBlockView></divideBlockView>
        <!--商家信息-->
        <div class="seller-info">
          <div class="title">商家信息</div>
          <div class="content-list">
            <ul>
              <li class="content-item" v-for="item of mySellerData.infos">
                <div class="content">{{item}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--图片层-->
      <transition enter-active-class="zoomIn" leave-active-class="zoomOut">
        <pictureView class="animated" :pictureUrl="pictureUrl" v-show="pictureCtrl"></pictureView>
      </transition>
      <!--遮罩层-->
      <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
        <maskView v-show="maskCtrl"></maskView>
      </transition>
      <!--购物车块-->
      <shoppingCarView :selectedFoodInfoList="selectedFoodList"></shoppingCarView>
    </div>
</template>

<script>
    import maskView from '../../public/mask/maskView'
    import shoppingCarView from '../../public/shoppingCar/shoppingCarView'
    import starView from '../../public/star/starView'
    import divideBlockView from '../../public/divideBlock/divideBlockView'
    import pictureView from '../../public/picture/pictureView'

    export default {
      name: "seller-view",
      components:{
        // 遮罩层
        maskView,
        // 购物车组件
        shoppingCarView,
        // 星星组件
        starView,
        // 分隔组件
        divideBlockView,
        // 查看图片组件
        pictureView
      },
      data(){
        return {
          // 用于此组件的seller数据
          mySellerData:'',
          // 用于support不同图标的class名
          supportsIconClassList:['decrease','discount','guarantee','invoice','special'],
          // 用于控制collectState的开关
          collectStateCtrl:false,
          // 记录picture的url
          pictureUrl:'',
        }
      },
      computed:{
        // 遮罩层的开关
        maskCtrl(){
          return this.$store.getters.shoppingCarDetail
        },
        // 图片层的开关
        pictureCtrl(){
          return this.$store.getters.picture;
        },
        // store中选中的food
        selectedFoodList(){
          return this.$store.state.selectedFoodList;
        },
        // collectState的文字状态
        collectState(){
          if(this.collectStateCtrl){
            return '已收藏'
          }else{
            return '未收藏'
          }
        }
      },
      methods:{
        // 从store获取组件用的seller数据
        getSellerData(){
          this.mySellerData = this.$store.state.sellerData;
        },
        // 切换collectState的状态
        toggleCollectState(){
          this.collectStateCtrl = !this.collectStateCtrl;
        },
        // 显示图片
        showPicture(item){
          this.$store.dispatch('showPicture');
          this.pictureUrl = item;
        }
      },
      created(){
        this.getSellerData();
      }


    }
</script>

<style scoped lang="less">
  @r:750/10rem;

  #sellerView {
    .seller-wrapper {
      /*background-color: pink;*/
      position: fixed;
      top: 350/@r;
      bottom: 92/@r;
      left: 0;
      right: 0;
      overflow: auto;
      .seller-title {
        /*background-color: gray;*/
        padding: 36/@r;
        .title-top {
          /*background-color: yellow;*/
          position: relative;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          .name {
            /*background-color: orange;*/
            margin-bottom: 16/@r;
            line-height: 28/@r;
            font-size: 28/@r;
            color: rgb(7,17,27);
          }
          .description {
            /*background-color: lightseagreen;*/
            margin-bottom: 36/@r;
            height: 36/@r;
            display: flex;
            align-items: center;
            line-height: 36/@r;
            font-size: 20/@r;
            color: rgb(77,85,93);
            .population {
              margin-left: 16/@r;
              margin-right: 24/@r;
            }

          }
          .collect {
            /*background-color: lightskyblue;*/
            width: 64/@r;
            position: absolute;
            right: 0;
            bottom: 36/@r;
            text-align: center;
            span {
              line-height: 48/@r;
              font-size: 48/@r;
              color: rgb(100,100,100);
            }
            .active {
              color: rgb(240,20,20);
            }
            .state {
              /*background-color: gray;*/
              line-height: 20/@r;
              font-size: 20/@r;
              color: rgb(77,85,93);
            }
          }


      }
        .title-bottom {
          /*background-color: whitesmoke;*/
          display: flex;
          .min-price,.deliveryPrice,.deliveryTime {
            /*background-color: indianred;*/
            margin-top: 36/@r;
            flex: 1;
            border-right: 1px solid rgba(7,17,27,0.1);
            text-align: center;
            .title {
              line-height: 20/@r;
              font-size: 20/@r;
              color: rgb(147,153,159);
              margin-bottom: 8/@r;
            }
            .price {
              line-height: 48/@r;
              font-size: 48/@r;
              font-weight: 200;
              color: rgb(7,17,27);
              span {
                font-size: 20/@r;
              }
            }
          }
          .deliveryTime {
            border-right: none;
          }
        }

      }
      .seller-notice {
        /*background-color: yellow;*/
        padding: 36/@r;
        .title {
          /*background-color: orange;*/
          line-height: 28/@r;
          font-size: 28/@r;
          color: rgb(7,17,27);
        }
        .content {
          /*background-color: whitesmoke;*/
          margin: 16/@r 24/@r 32/@r 24/@r;
          line-height: 48/@r;
          font-size: 24/@r;
          font-weight: 200;
          color: rgb(240,20,20);
        }
        .support-list {
          /*background-color: palegreen;*/
          .support-item {
            /*background-color: lightpink;*/
            display: flex;
            border-top: 1px solid rgba(7,17,27,0.1);
            padding: 32/@r 24/@r;
            .icon {
              width: 32/@r;
              height: 32/@r;
              background-repeat: no-repeat;
              background-size: 100%;
            }
            .decrease {
              background-image: url("./decrease_1@2x.png");
            }
            .discount {
              background-image: url("./discount_2@2x.png");
            }
            .guarantee {
              background-image: url("./guarantee_2@2x.png");
            }
            .invoice {
              background-image: url("./invoice_2@2x.png");
            }
            .special {
              background-image: url("./special_2@2x.png");
            }
            .description {
              /*background-color: whitesmoke;*/
              margin-left: 12/@r;
              line-height: 32/@r;
              font-size: 24/@r;
              font-weight: 200;
              color: rgb(7,17,27);
            }
          }


        }
      }
      .seller-pic {
        /*background-color: yellow;*/
        position: relative;
        padding: 36/@r;
        .title {
          /*background-color: hotpink;*/
          margin-bottom: 24/@r;
          line-height: 28/@r;
          font-size: 28/@r;
          color: rgb(7,17,27);
        }
        .pic-wrapper {
          /*background-color: whitesmoke;*/
          overflow-x: auto;
          .pic-list {
            width: 5000%;
            .pic-item {
              float: left;
              width: 240/@r;
              height: 180/@r;
              margin-right: 12/@r;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        }
      .seller-info {
        /*background-color: whitesmoke;*/
        padding: 36/@r;
        .title {
          /*background-color: red;*/
          margin-bottom: 24/@r;
          line-height: 28/@r;
          font-size: 28/@r;
          color: rgb(7,17,27);
        }
        .content-list {
          /*background-color: yellow;*/
          .content-item {
            /*background-color: white;*/
            border-top: 1px solid rgba(7,17,27,0.1);
            .content {
              /*background-color: yellow;*/
              margin: 32/@r 24/@r;
              line-height: 32/@r;
              font-size: 24/@r;
              font-weight: 200;
              color: rgb(7,17,27);
            }
          }
        }
      }
    }
  }

</style>
