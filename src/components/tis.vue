<template>
  <div class="box" v-if="isShow">
    <img src="../assets/img/success.png" alt="" class="img" v-show="flag===true">
    <img src="../assets/img/error.png" alt="" class="img" v-show="flag===false">
    <div class="msg">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'tis',
  data () {
    return {
      isShow: false,
      flag: undefined,
      msg: ''
    }
  },
  methods: {
    show (msg, flag = true) {
      this.flag = flag
      this.msg = msg
      this.isShow = true
      setTimeout(this.hidden, 1000)
    },
    hidden () {
      this.isShow = false
    }
  }
}
</script>

<style scoped>
.box{
  width: 12vw;
  height: 6vh;
  background-color: white;
  border-radius: 3px;
  position: fixed;
  left: 44vw;
  top: 10vh;
  display: flex;
  z-index: 99;
}

.img{
  height: 3vh;
  margin: 1.5vh;
}

.msg{
  line-height: 6vh;
}
</style>
