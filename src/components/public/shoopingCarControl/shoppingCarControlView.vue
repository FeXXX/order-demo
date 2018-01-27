<template>
    <div id="shoppingCarControlView">
      <transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
        <div class="decrease animated" v-show="foodInfo.count > 0" @click.stop="reduceFood">
          <span class="glyphicon glyphicon-minus-sign"></span>
        </div>
      </transition>
      <transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
        <div class="count animated" v-show="foodInfo.count > 0">{{foodInfo.count}}</div>
      </transition>
      <div class="increase" @click.stop="addFood">
        <span class="glyphicon glyphicon-plus-sign"></span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "shopping-car-control-view",
      props:{
        foodInfo:{
          type:Object,
        },
      },
      data(){
        return {
          foodCount:0
        }
      },
      methods:{
        // 增加该food的count
        addFood(){
          this.foodInfo.count ++;
        },
        // 减少该food的count
        reduceFood(){
          if(this.foodInfo.count <= 0){
            return;
          }
          this.foodInfo.count --;
        },
      },
    }
</script>

<style scoped lang="less">
  @r:750/10rem;

  #shoppingCarControlView {
    /*background-color: pink;*/
    display: flex;
    .decrease {
      /*background-color: orange;*/
      span {
        font-size: 48/@r;
        color: rgb(0,160,200);
        line-height: 48/@r;
        text-align: center;
      }
    }
    .count {
      /*background-color: indianred;*/
      flex: 1;
      width: 48/@r;
      line-height: 48/@r;
      font-size: 20/@r;
      text-align: center;
      color: rgb(149,153,159);
    }
    .increase {
      /*background-color: blueviolet;*/
      span {
        font-size: 48/@r;
        color: rgb(0,160,200);
        line-height: 48/@r;
        text-align: center;
      }
    }
  }
</style>
