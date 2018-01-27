<template>
    <div id="headerView" v-if="myHeaderData">
      <!--内容区块-->
      <div class="content-wrapper">
        <!--左侧头像-->
        <div class="avatar">
          <img :src="headerData.avatar" alt="avatar">
        </div>
        <!--右侧内容-->
        <div class="content">
          <!--标题-->
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{headerData.name}}</span>
          </div>
          <!--配送信息-->
          <div class="description">{{headerData.description}}/{{headerData.deliveryTime}}分钟送达</div>
          <!--优惠-->
          <div class="supports">
            <span class="icon" :class="supportsIconClassList[headerData.supports[0].type]"></span>
            <span class="text">{{headerData.supports[0].description}}</span>
          </div>
      </div>
        <!--总计块-->
        <div class="count-box">
          <div class="count">{{headerData.supports.length}}个</div>
          <span class="glyphicon glyphicon-menu-right"></span>
        </div>
      </div>
      <!--公告区块-->
      <div class="bulletin-wrapper" @click="showDetail()">
        <span class="icon"></span>
        <div class="text">{{headerData.bulletin}}</div>
        <span class="arrow glyphicon glyphicon-menu-right"></span>
      </div>
      <!--背景图-->
      <div class="background">
        <img :src="headerData.avatar" alt="headerBackground">
      </div>
      <!--弹出层-->
      <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div class="detail" v-show="detailCtrl">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{headerData.name}}</h1>
              <!--五星评分块-->
              <div class="star-wrapper">
                <starView :starScore="headerData.score" :starSize="48"></starView>
              </div>
              <!--标题块-->
              <titleView myTitle="优惠信息"></titleView>
              <!--优惠信息-->
              <ul class="supports">
                <li class="supports-item" v-for="item of headerData.supports">
                  <span class="icon" :class="supportsIconClassList[item.type]"></span>
                  <div class="text">{{item.description}}</div>
                </li>
              </ul>
              <!--标题块-->
              <titleView myTitle="商家公告"></titleView>
              <!--商家公告-->
              <div class="bulletin">
                <p>{{headerData.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="detail-close" @click="hideDetail()">
            <span class="glyphicon glyphicon-remove"></span>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
    import starView from '../public/star/starView'
    import titleView from './titleView'

    export default {
      name: "header-view",
      props:{
        // App传入的header数据
        headerData:{
          type:Object
        }
      },
      components :{
        starView,
        titleView
      },
      data(){
        return {
          //根据seller的type匹配对应的class名
          supportsIconClassList:['decrease','discount','guarantee','invoice','special'],
          // headerData的副本
          myHeaderData:'',
        }
      },
      computed:{
        // 商家detail页的开关
        detailCtrl(){
          return this.$store.getters.detail;
        },
      },
      methods:{
        // 显示商家detail页
        showDetail(){
          this.$store.dispatch('showDetail');
        },
        // 隐藏商家detail页
        hideDetail(){
          this.$store.dispatch('hideDetail');
        },
      },
      created(){
        // console.log('created');
      },
      mounted(){
        // console.log('mounted');
      },
      watch:{
        headerData(val){
          this.myHeaderData = val;
        },
      }
    }
</script>

<style scoped lang="less">
  @r:750/10rem;

  #headerView {
    position: relative;
    overflow: hidden;
    background-color: rgba(7,17,27,0.5);
    .content-wrapper {
      /*background-color: yellow;*/
      position: relative;
      display: flex;
      padding: 48/@r 24/@r 36/@r 48/@r;
      .avatar {
        width: 128/@r;
        height: 128/@r;
        img  {
          width: 100%;
          border-radius: 4/@r;
        }
      }
      .content {
        /*background-color: orange;*/
        margin-left: 32/@r;
        .title {
          display: flex;
          margin: 4/@r 0 16/@r 0;
          height: 36/@r;
          line-height: 36/@r;
          .brand {
            display: block;
            width: 60/@r;
            height: 36/@r;
            background:url("./brand@2x.png") no-repeat 0 0;
            background-size: 100%;
          }
          .name {
            margin-left: 12/@r;
            font-size: 32/@r;
            color: rgb(255,255,255);
            font-weight: bold;
          }
        }
        .description {
          margin-bottom: 20/@r;
          line-height: 24/@r;
          color: rgb(255,255,255);
          font-size: 24/@r;
        }
        .supports {
          display: flex;
          .icon {
            display: block;
            width: 24/@r;
            height: 24/@r;
            background-repeat: no-repeat;
            background-size: 100%;
          }
          .decrease {
            background-image: url("./decrease_1@2x.png");
          }
          .discount {
            background-image: url("./discount_1@2x.png");
          }
          .guarantee {
            background-image: url("./guarantee_1@2x.png");
          }
          .invoice {
            background-image: url("./invoice_1@2x.png");
          }
          .special {
            background-image: url("./special_1@2x.png");
          }
          .text {
            margin-left: 8/@r;
            line-height: 24/@r;
            color: #fff;
            font-weight: 200;
          }
        }
      }
      .count-box {
        display: flex;
        align-items: center;
        width: 86/@r;
        height: 48/@r;
        position: absolute;
        top: 134/@r;
        right: 24/@r;
        background-color: rgba(0,0,0,0.2);
        border-radius: 16/@r 19/@r;
        .count {
          /*background-color: cornflowerblue;*/
          margin-left: 16/@r;
          font-size: 20/@r;
          color: #fff;
          font-weight: 200;
          line-height: 24/@r;
        }
        span {
          margin-left: 10/@r;
          font-size: 20/@r;
          color: #fff;
        }
      }
    }
    .bulletin-wrapper {
      background-color:cadetblue;
      position: relative;
      display: flex;
      align-items: center;
      height: 56/@r;
      .icon {
        display: block;
        width: 44/@r;
        height: 24/@r;
        margin-left: 24/@r;
        background: url("./bulletin@2x.png") no-repeat;
        background-size: 100%;
      }
      .text {
        /*background-color: red;*/
        width: 100%;
        line-height: 56/@r;
        margin-left: 8/@r;
        margin-right: 52/@r;
        overflow: hidden;
        color: #fff;
        font-size: 20/@r;
        font-weight: 200;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .arrow {
        position: absolute;
        display: block;
        width: 8/@r;
        height: 11/@r;
        font-size: 7/@r;
        right: 24/@r;
        top: 20/@r;
      }
    }
    .background {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      filter: blur(10/@r);
      img {
        width: 100%;
      }
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      width: 100% ;
      height: 100%;
      overflow: auto;
      background-color: rgba(7,17,27,0.8);
      /*iphone专用背面模糊*/
      -webkit-backdrop-filter: blur(10px);
      .detail-wrapper {
        /*background-color: gray;*/
        min-height: 100%;
        .detail-main {
          /*background-color: silver;*/
          width: 80%;
          margin: 128/@r auto 0 auto;
          padding-bottom: 128/@r;
          .name {
            /*background-color: pink;*/
            line-height: 32/@r;
            font-size: 32/@r;
            font-weight: 700;
            color: #fff;
            text-align: center;
          }
          .star-wrapper {
            /*background-color: blueviolet;*/
            margin-top: 32/@r;
            padding: 4/@r 0;
            display: flex;
            justify-content: center;
          }
          ul.supports {
            /*background-color: palegreen;*/
            .supports-item {
              /*background-color: yellow;*/
              display: flex;
              margin-bottom: 24/@r;
              .icon {
                display: block;
                width: 32/@r;
                height: 32/@r;
                background-repeat: no-repeat;
                background-size: 100%;
              }
              .text {
                /*background-color: red;*/
                margin-left: 12/@r;
                line-height: 32/@r;
                font-size: 24/@r;
                color: rgb(255,255,255);
                font-weight: 200;
              }
              .decrease {
                background-image: url("./decrease_2@2x.png");
              }
              .discount {
                background-image: url("./discount_2@2x.png");
              }
              .guarantee {
                background-image: url(./guarantee_2@2x.png);
              }
              .invoice {
                background-image: url(./invoice_2@2x.png);
              }
              .special {
                background-image: url(./special_2@2x.png);
              }
            }
            .supports-item:last-child {
              margin-bottom: 0;
            }
          }
          .bulletin {
            padding: 0 24/@r;
            p {
              line-height: 48/@r;
              font-size: 24/@r;
              font-weight: 200;
              color:rgb(255,255,255);
            }
          }
        }
      }
      .detail-close {
        border: 1px solid #ccc;
        border-radius: 50%;
        position: relative;
        width: 80/@r;
        height: 80/@r;
        margin: -128/@r auto 0 auto;
        font-size: 64/@r;
        text-align: center;
        color: #ccc;
      }
    }
  }
</style>
