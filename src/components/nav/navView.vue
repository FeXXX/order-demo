<template>
  <div id="navView">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/rating">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
  </div>
</template>

<script>
    export default {
        name: "nav-view"
    }
</script>

<style lang="less" scoped>
  @r:750/10rem;

  #navView {
    /*background-color: red;*/
    display: flex;
    height: 80/@r;
    line-height: 80/@r;
    justify-content: space-between;
    border-bottom: 1px solid  rgba(7,17,27,0.1);
    .tab-item {
      /*background-color: yellow;*/
      flex: 1;
      a {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 28/@r;
        color: rgb(77,85,93);
      }
      .active {
        color: rgb(240,20,20);
      }
    }
  }

</style>
