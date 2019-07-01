<template>
  <div class="bg">
    <div class="main-box">
      <div class="choose-box">
        <router-link :to="{name:'login'}" class="choose" active-class="active">
          <div>登录</div>
        </router-link>
        <router-link :to="{name:'register'}" class="choose" active-class="active">
          <div>注册</div>
        </router-link>
      </div>
      <div class="input-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin',
  inject: ['show'],
  provide () {
    return {
      show: this.show
    }
  }
}
</script>

<style scoped>
.bg{
  background-image: url("../../assets/bg.jpg");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-box{
  background-color: rgba(255,255,255,0.75);
  width: 25%;
  height: 50%;
  border-radius: 50px;
  position: absolute;
  left: 37.5%;
  top: 25%;
}
.choose div{
  color: rgba(255,255,255,0.75);
  background-color: rgba(42,47,53,0.75);
  float: left;
  width: 50%;
  height: 5vh;
  text-align: center;
  line-height: 5vh;
}
.choose-box{
  width: 20vw;
  height: 0.5%;
  margin: 5vh auto;
}
.input-box{
  width: 20vw;
  height: 30vh;
  margin: 0 auto;
  padding-top: 4vh;
}
.active div{
  color: rgba(255,255,255,1);
  background-color: rgba(42,47,53,1);
}
</style>
