<template>
    <div id="pictureView" @click="closePicture()">
      <div class="content">
        <img :src="pictureUrl" alt="">
      </div>
    </div>
</template>

<script>
    export default {
      name: "picture-view",
      props:{
        pictureUrl:{
          type:String
        }
      },
      methods:{
        closePicture(){
          this.$store.dispatch('hidePicture');
        }
      }
    }
</script>

<style scoped lang="less">
  @r:750/10rem;

  #pictureView {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 600;
    display: flex;
    align-items: center;
    background-color: rgba(0,0,0,0.9);
    .content {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }

</style>
