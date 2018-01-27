<template>
    <div id="maskView" @click="closeMask()">
      <!--遮罩层-->
      <div class="animated"></div>
    </div>
</template>

<script>
    export default {
      name: "mask-view",
      methods:{
        closeMask(){
          this.$store.dispatch('hideShoppingCarDetail');
        }
      }

    }

</script>

<style scoped lang="less">
  #maskView {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: rgba(7,17,27,0.6);
    filter: blur(10px);
  }
</style>
