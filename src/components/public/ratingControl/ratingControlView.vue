<template>
    <div id="ratingControlView">
      <div class="select-wrapper">
        <div class="select-item all" :class="{'all-active':allActive}" @click="selectAll()">全部<i>57</i></div>
        <div class="select-item good" :class="{'good-active':goodActive}" @click="selectGood()">推荐<i>47</i></div>
        <div class="select-item bad" :class="{'bad-active':badActive}" @click="selectBad()">吐槽<i>10</i></div>
      </div>
      <div class="select-content" :class="{'filter-active':filterNullTrigger}" @click="filterNull()">
        <span class="glyphicon glyphicon-ok-circle"></span>只看有内容的评价
      </div>

      <!--预览-->
      <!--<p>{{myChooseType}}</p>-->
      <!--<p>{{myFilter}}</p>-->
    </div>
</template>

<!--屎用我的时候，对传入的数据新建一个副本，在这里改变该副本后，$emit出去，做到双向数据绑定-->

<script>
    export default {
      name: "rating-control-view",
      props:{
        // 筛选类型
        chooseType:{
          type:Number
        },
        // 是否筛选空值
        filter:{
          type:Boolean
        }
      },
      data(){
        return {
          allActive:true,//控制all激活状态
          goodActive:false,//控制good激活状态
          badActive:false,//控制bad激活状态
          filterNullTrigger:false,//控制filterNull的点击切换,和激活状态
          myChooseType:this.chooseType,//传入的chooseType的副本，在这里改变后广播回去
          myFilter:this.filter,//传入的filter的副本，在这里改变后广播回去
        }
      },
      methods:{
        selectAll(){
          this.allActive = true;
          this.goodActive = false;
          this.badActive = false;
          this.myChooseType = -1;
        },
        selectGood(){
          this.allActive = false;
          this.goodActive = true;
          this.badActive = false;
          this.myChooseType = 0;
        },
        selectBad(){
          this.allActive = false;
          this.goodActive = false;
          this.badActive = true;
          this.myChooseType = 1;

        },
        filterNull(){
          if(!this.filterNullTrigger){
            this.myFilter = true;
          }else{
            this.myFilter = false;
          }
          this.filterNullTrigger = !this.filterNullTrigger;
        }
      },
      watch:{
        // 监测myChooseType的变化，并广播出去改变后的值
        myChooseType(val){
          this.$emit('on-chooseType-change',val)
        },
        // myFilterNull的变化，并广播出去改变后的值
        myFilter(val){
          this.$emit('on-filter-change',val)
        }
      }
    }
</script>

<style scoped lang="less">
  @r:750/10rem;

  #ratingControlView {
    /*background-color: darkslategray;*/
    .select-wrapper {
      /*background-color: yellow;*/
      padding-bottom: 36/@r;
      display: flex;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .select-item {
        /*background-color: pink;*/
        padding: 16/@r 24/@r 16/@r 24/@r;
        margin-right: 16/@r;
        line-height: 32/@r;
        font-size: 24/@r;
        border-radius: 2px;
        i {
          font-size: 16/@r;
        }
      }
      .all {
        color: rgb(255,255,255);
        background-color: rgb(0,160,200);
      }
      .good {
        color: rgb(77,85,93);
        background-color: rgba(0,160,200,0.2);
      }
      .bad {
        color: rgb(77,85,93);
        background-color: rgba(77,85,93,0.2);
      }
    }
    .select-content {
      /*background-color: hotpink;*/
      padding: 24/@r 0 24/@r 0;
      line-height: 48/@r;
      font-size: 24/@r;
      color: rgb(147,153,159);
      span {
        font-size: 48/@r;
        line-height: 48/@r;
        margin-right: 8/@r;
        vertical-align: bottom;
      }
    }
    .filter-active {
      color: rgb(240,20,20);
    }
    .all-active {
      box-shadow: 0 0 10px rgb(0,160,200);
    }
    .good-active {
      box-shadow: 0 0 10px rgb(0,160,200);
    }
    .bad-active {
      box-shadow: 0 0 10px rgb(77,85,93);
    }
  }

</style>
