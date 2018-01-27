<template>
    <div id="shoppingCarView">
      <!--购物车块-->
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper" @click="toggleShoppingCarDetail()">
            <div class="logo" :class="{'logo-highlight':totalCount > 0}">
              <span class="glyphicon glyphicon-shopping-cart"></span>
            </div>
            <div class="count" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'price-highlight':totalPrice > 0}">¥{{totalPrice}}</div>
          <div class="description">另需要配送费¥4元</div>
        </div>
        <div class="content-right" :class="{'order-confirm':totalPrice >= minCarriage}" @click="submitOrder()">
          <div class="carriage">{{carriage}}</div>
        </div>
      </div>
      <!--购物车详情块-->
      <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
        <div class="shoppingCarDetail animated" v-show="shoppingCarDetailCtrl">
          <div class="detail-header">
            <h1 class="title">购物车</h1>
            <div class="clear" @click="clearAllSelectedFood()">清空</div>
          </div>
          <div class="detail-content">
            <ul>
              <transition-group enter-active-class="fadeIn" leave-active-class="fadeOut">
                <li class="clearfix animated" :key="index" v-for="(food,index) of selectedFoodInfoList">
                  <div class="name">{{food.name}}</div>
                  <div class="shoppingCarControl-wrapper">
                    <shoppingCarControlView :foodInfo="food"></shoppingCarControlView>
                  </div>
                  <div class="total-price"><i>¥</i>{{food.price * food.count}}</div>
                </li>
              </transition-group>
            </ul>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
    import shoppingCarControlView from '../shoopingCarControl/shoppingCarControlView'
    export default {
      name: "shopping-car-view",
      components:{
        shoppingCarControlView
      },
      props:{
        // goods组件传来的选中的foodInfo
        selectedFoodInfoList:{
          type:Array,
        }
      },
      data(){
        return {
          minCarriage:20,//最低配送费
          shoppingCarDetailTrigger:true,//用于控制购物车logo切换
        }
      },
      computed:{
        // 计算传入的food的总价
        totalPrice(){
          let totalPrice = 0;
          this.selectedFoodInfoList.forEach((item) => {
            if(item.count){
              totalPrice += item.price * item.count;
            }
          });
          return totalPrice;
        },
        // 计算传入的food的总数
        totalCount(){
          let totalCount = 0;
          this.selectedFoodInfoList.forEach((item) => {
            if(item.count){
              totalCount += item.count;
            }
          });
          return totalCount;
        },
        // 计算配送栏的信息
        carriage(){
          // 总价高于配送最低价时
          if(this.totalPrice >= this.minCarriage){
            return '确认订单';
          }
          // 总价低于配送最低价时
          if(this.totalPrice < this.minCarriage){
            let gap = this.minCarriage - this.totalPrice;
            return '还差'+ gap +'元起送';
          }
          // 总价为0时
          if(this.totalPrice === 0){
            return '¥'+ this.minCarriage + '起送'
          }
        },
        // 购物车详情页的开关
        shoppingCarDetailCtrl(){
          return this.$store.getters.shoppingCarDetail;
        },
      },
      methods:{
        // 点击购物车logo切换详情页
        toggleShoppingCarDetail(){
          if(this.totalCount > 0){
            if(!this.shoppingCarDetailCtrl){
              this.$store.dispatch('showShoppingCarDetail')
            }else{
              this.$store.dispatch('hideShoppingCarDetail');
            }
            this.shoppingCarDetailTrigger = !this.shoppingCarDetailTrigger ;
          }
        },
        // 清空详情页内的food
        clearAllSelectedFood(){
          this.selectedFoodInfoList.forEach((food) => {
            food.count = 0;
          })
        },
        // 提交订单
        submitOrder(){
          if(this.totalPrice >= this.minCarriage){
            let order = [];
            this.selectedFoodInfoList.forEach((food) => {
              order.push({'品名':food.name,'单价':food.price,'份数':food.count,'总价':food.price * food.count})
            });
            order.push({'总价':this.totalPrice})
            console.table(order);
          }
        }
      },
      watch:{
        // 当购物车为空时收起详情页
        totalCount(){
          if(this.totalCount <= 0){
            this.$store.dispatch('hideShoppingCarDetail');
            this.shoppingCarDetailTrigger = true;
          }
        }
      },
      created(){
      }
    }
</script>

<style scoped lang="less">
  @r:750/10rem;

  #shoppingCarView {
    background-color: yellow;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 96/@r;
    width: 100%;
    z-index: 300;
    .content {
      display: flex;
      background-color: #141d27;
      position: relative;
      z-index: 200;
      .content-left {
        background-color: #131D26;
        display: flex;
        align-items: center;
        flex: 1;
        .logo-wrapper {
          background-color: #141D27;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100/@r;
          width: 100/@r;
          border-radius: 50%;
          position: relative;
          top: -16/@r;
          left: 36/@r;
          .logo {
            background-color: rgba(255,255,255,0.4);
            height: 88/@r;
            width: 88/@r;
            border-radius: 50%;
            text-align: center;
            span {
              /*background-color: orangered;*/
              font-size: 36/@r;
              line-height: 88/@r;
              color: rgba(255,255,255,0.4);
            }
          }
          .logo-highlight {
            background-color: #00A0DC;
            span {
              color: #FFFFFF;
            }
          }
          .count {
            width: 48/@r;
            height: 32/@r;
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 15/@r;
            background-color: rgb(240,20,20);
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
            padding: 0 12/@r;
            text-align: center;
            font-size: 18/@r;
            font-weight: 700;
            line-height: 40/@r;
            color: rgb(255,255,255);
          }
        }
        .price {
          /*background-color: greenyellow;*/
          margin: 24/@r 0 24/@r 72/@r;
          padding-right: 24/@r;
          line-height: 48/@r;
          font-size: 32/@r;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .price-highlight {
          color: #fff;
        }
        .description {
          /*background-color: gray;*/
          margin-left: 24/@r;
          margin-right: 24/@r;
          line-height: 48/@r;
          font-size: 24/@r;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
        }
      }
      .content-right {
        background-color: #2B333B;
        width: 210/@r;
        padding: 24/@r 16/@r 0 16/@r;
        .carriage {
          /*background-color: violet;*/
          line-height: 48/@r;
          font-size: 24/@r;
          text-align: center;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
        }
      }
      .order-confirm {
        background-color: #00b43c;
        .carriage {
          color: #fff;
          font-size: 32/@r;
        }
      }
    }
    .shoppingCarDetail {
      background-color: #FFFFFF;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 96/@r;
      z-index: 100;
      .detail-header {
        background-color: #F3F5F7;
        height: 80/@r;
        width: 100%;
        padding: 0 36/@r;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        .title {
          /*background-color: pink;*/
          line-height: 80/@r;
          font-size: 28/@r;
          font-weight: 200;
          color: rgb(7,17,27);
        }
        .clear {
          /*background-color: orange;*/
          line-height: 80/@r;
          font-size: 24/@r;
          color: rgb(0,160,220);
        }
      }
      .detail-content {
        /*background-color: yellowgreen;*/
        margin: 80/@r 36/@r 0 36/@r;
        max-height:436/@r;
        overflow: auto;
        ul {
          li {
            /*background-color: pink;*/
            border-bottom: 1px solid rgba(7,17,27,0.1);
            padding: 24/@r 0 24/@r 0;
            .name {
              /*background-color: chocolate;*/
              float: left;
              line-height: 48/@r;
              font-size: 28/@r;
              color: rgb(7,17,27);
            }
            .total-price {
              i {
                font-size: 20/@r;
                font-weight: normal;
              }
              /*background-color: lightskyblue;*/
              float: right;
              margin: 0 24/@r 0 36/@r;
              line-height: 48/@r;
              font-size: 28/@r;
              font-weight: 700;
              color: rgb(240,20,20);
            }
            .shoppingCarControl-wrapper {
              /*background-color: deeppink;*/
              width: 136/@r;
              float: right;
            }
          }
        }
      }
    }
  }

</style>
