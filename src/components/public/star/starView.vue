<template>
    <div id="starView" v-if="starClassesList">
      <span v-for="starClass of starClassesList" :class="[starType,starClass]" class="star"></span>
    </div>
</template>

<script>
  const starLength = 5;

  export default {
      name: "star-view",
      props:{
        // 评分分数
        starScore:{
          type:Number
        },
        // 星星的尺寸:24|36|48
        starSize:{
          type:Number
        },
      },
      data(){
        return {
          starType:'star-' + this.starSize,
          starClassesList:'',
        }
      },
      methods:{
        // 根据评分设置class名列表
        cratesStarClassesList(){
          let starClassList = [];
          // 求得score的整数部分
          let integer = Math.floor(this.starScore);
          // 将score以0.5为分隔
          let score = Math.floor(this.starScore * 2) / 2;
          // 判断score是否整数
          let decimal = score % 1 ;
          // 计算score距离满分的个数
          let residue = starLength - Math.round(this.starScore);
          // 将整数部分插入on的class名
          for (let i = 0; i < integer; i++) {
            starClassList.push('on-'+this.starSize);
          }
          // 有小数时，插入half插入half的class名
          if(decimal != 0){
            starClassList.push('half-'+this.starSize);
          }
          // 将剩余空间插入off的class名
          for (let i = 0; i < residue; i++) {
            starClassList.push('off-'+this.starSize);
          }
          this.starClassesList = starClassList;
        },
      },
      created(){
        this.cratesStarClassesList();
        // console.log(this.starScore);
        // console.log(this.starSize);
        // console.log(this.starClassesList);
      },
    }
</script>

<style scoped lang="less">
  @r:750/10rem;

  #starView {
    display: flex;
    .star {
      display: block;
      background-repeat: no-repeat;
      background-size: 100%;
    }
    .star-24{
      width: 20/@r;
      height: 20/@r;
      margin-right: 6/@r;
      background-size: 100%;
    }
    .star-24:last-child {
      margin-right: 0;
    }
    .on-24 {
      background-image: url('star24_on@2x.png');
    }
    .half-24 {
      background-image: url('star24_half@2x.png');
    }
    .off-24 {
      background-image: url('star24_off@2x.png');
    }

    .star-36 {
      width: 30/@r;
      height: 30/@r;
      margin-right: 12/@r;
      background-size: 100%;
    }
    .star-36:last-child {
      margin-right: 0;
    }
    .on-36 {
      background-image: url('star36_on@2x.png');
    }
    .half-36 {
      background-image: url('star36_half@2x.png');
    }
    .off-36 {
      background-image: url('star36_off@2x.png');
    }

    .star-48 {
      /*background-color: yellow;*/
      width: 40/@r;
      height: 40/@r;
      margin-right: 44/@r;
      background-size: 100%;
    }
    .star-48:last-child {
      margin-right: 0;
    }
    .on-48 {
      background-image: url('star48_on@2x.png');
    }
    .half-48 {
      background-image: url('star48_half@2x.png');
    }
    .off-48 {
      background-image: url('star48_off@2x.png');
    }
  }

</style>
