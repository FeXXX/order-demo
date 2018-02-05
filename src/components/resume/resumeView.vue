<template>
    <div id="resumeView">
      <!--标题-->
      <div class="name">邓家智</div>
      <!--头像-->
      <div class="avatar-wrapper">
        <div class="avatar"><img src="./FeXXX.jpg"></div>
      </div>
      <!--联系方式-->
      <div class="contact">
        <div class="tel">
          <span class="glyphicon glyphicon-earphone"></span>
          13427540580
        </div>
        <div class="email">
          <span class="glyphicon glyphicon-envelope"></span>
          377162713@qq.com
        </div>
      </div>
      <!--自我介绍-->
      <div class="introduce">
        <h2 class="title">My-skill</h2>
        <p class="content">
          1、熟悉HTML5和CSS3的技术,熟练div+css标准化布局;<br>
          2、懂得使用firework对设计图进行测量切图;<br>
          3、熟悉javascript、ES6语法;<br>
          4、熟悉ajax,jsonp数据请求技术;<br>
          5、灵活运用jQuery、Vue，vuex,vue-router等；<br>
          6、了解模块化开发形式,懂得使用webpack打包;<br>
          7、有良好的面向对象意识；制作符合w3c规范页面。<br>
          8、对技术充满热情，自学能力强，有轻微代码洁癖症，解决bug有满足感！
        </p>
      </div>
      <!--倒数关闭按钮-->
      <button class="close-btn btn btn-danger" @click="closeResume()">点击关闭({{count}})s</button>
      <!--暂定倒计时按钮-->
      <button class="pause-btn btn btn-default" @click="pauseCount()">{{pauseTxt}}</button>
    </div>
</template>

<script>
    export default {
      name: "resume-view",
      data(){
        return {
          // 倒计时
          count:5,
          // 暂定开始按钮状态
          pause:true,
          // 计时器
          timer:null,
        }
      },
      computed:{
        pauseTxt(){
          return this.pause ? '点击暂定' : '点击继续';
        }
      },
      watch:{
        // count为0时，关闭页面
        count(data){
          if(data <= 0){
            clearInterval(this.timer);
            this.closeResume();
          }
        }
      },
      methods:{
        // 关闭resume页
        closeResume(){
          this.$store.dispatch('hideResume')
        },
        // 倒数
        countDown(){
          console.log(this.count);
          this.timer = setInterval(() => {
            this.count --;
          },1000);
        },
        // 暂定/开始倒数
        pauseCount(){
          if(this.pause){
            this.pause = false;
            clearInterval(this.timer);
          }else{
            this.pause = true;
            this.countDown();
          }
        }
      },
      mounted(){
        // 开始倒数
        this.countDown();
      }
    }
</script>

<style scoped lang="less">
  @r:750/10rem;
  #resumeView {
    background: linear-gradient(#F0AB70 , #cccccc);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    .close-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 200/@r;
      height: 50/@r;
      right: 20/@r;
      top: 20/@r;
      font-size: 20/@r;
      font-weight: 500;
      color: rgb(0,0,0);
    }
    .pause-btn {
      position: absolute;
      right: 250/@r;
      top: 20/@r;
      width: 200/@r;
      height: 50/@r;
      font-size: 20/@r;
      font-weight: 500;
    }
    .name {
      /*background-color:pink;*/
      margin-top: 100/@r;
      line-height: 100/@r;
      font-size: 100/@r;
      font-weight: 700;
      text-align: center;
      text-shadow: 0 0 20px rgba(0,0,0,0.7);
      animation: name 2s infinite;
    }
    .avatar-wrapper {
      perspective: 800;
      margin-top: 20/@r;
      .avatar {
        width: 200/@r;
        height: 200/@r;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
        animation: avatar 2s infinite;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .contact {
      .tel {
        /*background-color: violet;*/
        margin-top: 50/@r;
        font-size: 50/@r;
        font-weight: 700;
        text-align: center;
        text-decoration: underline;
      }
      .email {
        font-size: 50/@r;
        font-weight: 700;
        text-align: center;
      }
    }
    .introduce {
      margin-top: 20/@r;
      padding: 0 20/@r 0 20/@r;
      .title {
        font-size: 40/@r;
        font-weight: 700;
        line-height: 60/@r;
      }
      .content {
        line-height: 36/@r;
        font-size: 32/@r;
        color: darkblue;
      }
    }

    /*头像动画*/
    @keyframes avatar {
      0% {transform:translateZ(0) rotateZ(-30deg);}
      50% {transform:translateZ(200/@r) rotateZ(30deg)}
      100% {transform:translateZ(0) rotateZ(-30deg);}
    }
    /*名字动画*/
    @keyframes name {
      0% {transform:scale(1)}
      50% {transform:scale(1.2)}
      100% {transform:scale(1)}
    }
  }
</style>
