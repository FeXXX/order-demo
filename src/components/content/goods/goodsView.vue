<template>
    <div id="goodsView" v-if="myGoodsData" >
      <!--商品列表块-->
      <div class="goods-wrapper">
        <div class="menu-wrapper" ref="menuWindowDOM">
          <ul ref="menuListDOM">
            <li v-for="(item,index) of myGoodsData" :key="index" ref="menuItemDOM" class="menu-item" :class="{selected:index === selectedMenuItemIndex}" @click="selectMenuItem(index)">
              <div class="item-wrapper">
                <span v-if="item.type > 0" class="icon" :class="supportsIconClassList[item.type]"></span>
                {{item.name}}
              </div>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" ref="foodWindowDOM" @scroll="scrollFoodList()">
          <ul class="food-list" ref="foodListDOM">
            <li v-for="(item,itemIndex) of myGoodsData" :key="itemIndex" ref="foodItemDOM">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="(food,foodIndex) of item.foods" :key="foodIndex" class="food-item" @click.stop="showFoodInfo(itemIndex,foodIndex)">
                  <div class="icon">
                    <img :src="food.icon" alt="">
                  </div>
                  <div class="content" >
                    <h2 class="name">{{food.name}}</h2>
                    <p v-if="food.description" class="description">{{food.description}}</p>
                    <div class="extra">
                      <span class="sellCount">月售{{food.sellCount}}份</span>
                      <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                    <span class="now-price">
                      <i>¥</i>
                      {{food.price}}
                    </span>
                      <span v-if="food.oldPrice" class="old-price">¥{{food.oldPrice}}</span>
                    </div>
                    <div class="shoppingCarControl-wrapper">
                      <shoppingCarControlView :foodInfo="food"></shoppingCarControlView>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!--购物车块-->
      <shoppingCarView :selectedFoodInfoList="selectedFoodInfoList"></shoppingCarView>
      <!--遮罩层-->
      <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <maskView v-show="maskCtrl"></maskView>
      </transition>
      <!--商品详情页-->
      <transition enter-active-class="zoomIn" leave-active-class="zoomOut">
        <foodInfoView class="animated" :thisFoodInfo="thisFoodInfo" v-if="foodInfoCtrl"></foodInfoView>
      </transition>
    </div>
</template>

<script>
    import shoppingCarView from '../../public/shoppingCar/shoppingCarView'
    import shoppingCarControlView from '../../public/shoopingCarControl/shoppingCarControlView'
    import foodInfoView from '../../foodInfo/foodInfoView'
    import maskView from '../../public/mask/maskView'

    export default {
      name: "goods-view",
      components:{
        // 购物车块
        shoppingCarView,
        // 购物车控制块
        shoppingCarControlView,
        // food详情信息块
        foodInfoView,
        // 遮罩层
        maskView
      },
      data(){
        return {
          myGoodsData:'',//本组件所需数据，先设置为空，待watch完成后再赋值渲染
          supportsIconClassList:['decrease','discount','guarantee','invoice','special'],//根据type挂载对应的图标
          foodItemPosition:'',//记录food列表的位置
          menuItemPosition:'',//记录menu列表的位置
          selectedMenuItemIndex:0,//记录点击的menu的index
          thisFoodInfo:'',//记录传递给food详情页的数据
        }
      },
      computed:{
        // 记录选中的food
        selectedFoodInfoList(){
          let selectedFoodInfoList = [];
          this.myGoodsData.forEach((goodItem) => {
            goodItem.foods.forEach((food) => {
              if(food.count > 0){
                selectedFoodInfoList.push(food);
              }
            })
          });
          // 把选中的food数据上传到store中方便共享
          this.$store.state.selectedFoodList = selectedFoodInfoList;
          return selectedFoodInfoList;
        },
        // 遮罩层的开关
        maskCtrl(){
          return this.$store.getters.shoppingCarDetail;
        },
        // food详情页的开关
        foodInfoCtrl(){
          return this.$store.getters.foodInfo;
        },
        // 从store获取的goods数据
        goodsData(){
          return this.$store.state.goodsData;
        }
      },
      watch:{
        // goodsData变化完成后，赋值给这里的myGoodsData，再开始渲染模板和执行相关DOM操作
        goodsData(val){
          this.myGoodsData = val;
          this.setGoodsData()
        }
      },
      methods:{
        // 给每个food设置一个count属性供foodControl组件改变，并nextTick相关DOM操作
        setGoodsData(){
          // 给每个food设置一个count属性
            this.myGoodsData.forEach((item) => {
              item.foods.forEach((food) => {
                this.$set(food,'count',0)
              })
            });
            // 获取完数据后回调
            this.$nextTick(() => {
              this.setPerFoodItemPosition();
              this.setPerMeunItemPosition();
            })
        },
        // 录入每一项food的位置(DOM操作)
        setPerFoodItemPosition(){
          let arr = [];
          let positionY = 0;
          arr.push(positionY);
          let foodItemDOMs = this.$refs.foodItemDOM;
          foodItemDOMs.forEach((value)=>{
            // console.log(value.clientHeight + '||' + value.offsetHeight);
            positionY += value.offsetHeight;
            arr.push(positionY)
          });
          this.foodItemPosition = arr;
        },
        // 录入每一项menu的位置(DOM操作)
        setPerMeunItemPosition(){
          let arr = [];
          let positionY = 0;
          arr.push(positionY);
          let menuItemDOMs = this.$refs.menuItemDOM;
          menuItemDOMs.forEach((value) => {
            // console.log(value.clientHeight + '||' + value.offsetHeight);
            positionY += value.offsetHeight;
            arr.push(positionY);
          });
          this.menuItemPosition = arr;
        },
        // 点击menu项时food列表对应滚动
        selectMenuItem(index){
          // 选中当前menu-item
          // this.selectedMenuItemIndex = index;
          // 控制foodList对应滚动
          let scrollDistance = this.foodItemPosition[index];
          let foodWindowDOM = this.$refs.foodWindowDOM;
          // JQ动画
            $(foodWindowDOM).animate({
              scrollTop:scrollDistance
            },500)
        },
        // food列表滚动时menu对应选中
        scrollFoodList(){
          // 滚动foodList时控制menu-item
          let foodScrollTop = this.$refs.foodWindowDOM.scrollTop;
          let menuScrollTop = this.$refs.menuWindowDOM.scrollTop;

          // console.log(menuScrollTop);

          let menuWindowHeight = this.$refs.menuWindowDOM.offsetHeight;
          // console.log(menuWindowHeight);

          // 计算foodScrollTop落在foodItemPosition的哪个区间
          for (let i = 0; i < this.foodItemPosition.length; i++) {
            if( foodScrollTop <= this.foodItemPosition[i] && foodScrollTop >= this.foodItemPosition[i-1]){
              // console.table({'next_':this.foodItemPosition[i], 'pre_':this.foodItemPosition[i - 1],'index_':i});
              // console.log(i);
              this.selectedMenuItemIndex = i-1;


              // 当下拉foodList时menuList超出menu框时，控制回弹
              // console.log(this.menuItemPosition[i-1]);
              if(this.menuItemPosition[i] > menuWindowHeight){
                let gap = this.menuItemPosition[i] - menuWindowHeight;
                this.$refs.menuWindowDOM.scrollTop = gap;
              }

              // 当上拉foodList时meunList超出menu框时,控制回弹
              if(menuScrollTop > this.menuItemPosition[i-1]){
                let gap = menuScrollTop - menuScrollTop - this.menuItemPosition[i-1];
                // console.log(gap);
                this.$refs.menuWindowDOM.scrollTop = gap;
              }
            }
          }
        },
        // 点击food时设置该foodInfo并显示该food详情页
        showFoodInfo(itemIndex,foodIndex){
          // 设置传给food详情页的数据
          this.thisFoodInfo = this.myGoodsData[itemIndex].foods[foodIndex];
          // 显示food详情页
          this.$store.dispatch('showFoodInfo');
        }
      },
    }
</script>

<style scoped lang="less">
  @r:750/10rem;
  #goodsView {
    .goods-wrapper {
      /*background-color: silver;*/
      display: flex;
      position: absolute;
      top: 350/@r;
      left: 0;
      right: 0;
      bottom: 92/@r;
      /*overflow: auto;*/
      .menu-wrapper {
        /*background-color: white;*/
        width: 160/@r;
        overflow: auto;
        .menu-item {
          /*background-color: yellowgreen;*/
          display: table;
          width: 100%;
          height: 108/@r;
          padding: 0 18/@r;
          background-color: #F4F5F7;
          .item-wrapper {
            /*background-color: pink;*/
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            line-height: 28/@r;
            font-weight: 200;
            font-size: 20/@r;
            color: #2C3238;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            .icon {
              display: inline-block;
              width: 24/@r;
              height: 24/@r;
              vertical-align: bottom;
              background-repeat: no-repeat;
              background-size: 100%;
            }
            .decrease {
              background-image: url("./decrease_3@2x.png");
            }
            .discount {
              background-image: url("./discount_3@2x.png");
            }
            .guarantee {
              background-image: url(./guarantee_3@2x.png);
            }
            .invoice {
              background-image: url(./invoice_3@2x.png);
            }
            .special {
              background-image: url(./special_3@2x.png);
            }
          }
        }
        .selected {
          background-color: rgba(200,200,200,0.5);
        }
      }
      .foods-wrapper {
        /*background-color: darkorange;*/
        overflow: auto;
        width: 100%;
        .food-list {
          li {
            /*background-color: pink;*/
            .title {
              height: 52/@r;
              line-height: 52/@r;
              padding-left: 28/@r;
              font-size: 24/@r;
              color: rgb(147,153,159);
              border-left: 2px solid #d9dde1;
              background-color: #f3f5f7;
            }
            .food-item {
              /*background-color: lightgoldenrodyellow;*/
              border-bottom: 1px solid rgba(7,17,27,0.1);
              display: flex;
              margin: 36/@r 36/@r 0 36/@r;
              padding-bottom: 36/@r;
              .icon {
                /*background-color: lightseagreen;*/
                width: 116/@r;
                height: 116/@r;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .content {
                flex: 1;
                /*background-color: whitesmoke;*/
                position: relative;
                margin-left: 20/@r;
                .name {
                  /*background-color: hotpink;*/
                  margin-top: 4/@r;
                  line-height: 28/@r;
                  font-size: 28/@r;
                  color: rgb(7,17,27);
                }
                .description {
                  /*background-color: yellowgreen;*/
                  margin-top: 16/@r;
                  font-size: 20/@r;
                  line-height: 20/@r;
                  color: rgb(147,153,159);
                }
                .extra {
                  /*background-color: yellow;*/
                  margin-top: 16/@r;
                  font-size: 20/@r;
                  line-height: 20/@r;
                  color: rgb(147,153,159);
                  .rating {
                    margin-left: 24/@r;
                  }
                }
                .price {
                  .now-price {
                    font-size: 28/@r;
                    color: #F01414;
                    line-height: 48/@r;
                    i {
                      font-size: 20/@r;
                      font-weight: normal;
                    }
                  }
                  .old-price {
                    margin-left: 24/@r;
                    line-height: 48/@r;
                    font-size: 20/@r;
                    font-weight: 700;
                    color: rgb(147,153,159)
                  }
                }
                .shoppingCarControl-wrapper {
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  z-index: 0;
                }
              }
            }
            .food-item:last-child {
              border-bottom: 0;
            }
          }
        }
      }
    }
  }
</style>
