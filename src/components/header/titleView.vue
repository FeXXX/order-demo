<template>
    <div id="titleView">
      <div class="line"></div>
      <div class="test">{{myTitle}}</div>
      <div class="line"></div>
    </div>
</template>

<script>
    export default {
        name: "title-view",
        props:{
          myTitle:String
        }
    }
</script>

<style scoped lang="less">
  @r:750/10rem;

  #titleView {
    /*background-color: black;*/
    margin: 56/@r auto 48/@r auto;
    display: flex;
    .line {
      background-color: rgba(255,255,255,1);
      flex: 1;
      align-self: center;
      height: 1px;
    }
    .test {
      /*background-color: orange;*/
      padding: 0 24/@r;
      line-height: 28/@r;
      font-size: 28/@r;
      font-weight: 700;
      color: #fff;
    }
  }
</style>
