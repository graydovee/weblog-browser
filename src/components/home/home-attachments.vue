<template>
  <div>
    <div class="main">
      <div class="content">
        <img :src="user.profilePicture" alt="" class="pic" @click="goto">
        <div class="msg">
          <div class="info">
            <p class="num">{{fans.length}}</p>
            <p class="name">粉丝</p>
          </div>
          <div class="info">
            <p class="num">{{focused.length}}</p>
            <p class="name">关注</p>
          </div>
          <div class="info" style="border: 0">
            <p class="num">{{blogs.length}}</p>
            <p class="name">文章</p>
          </div>
        </div>
      </div>
      <p class="nickname">{{user.nickname}}</p>
    </div>
    <attachments :admin="true" :user="user"></attachments>
  </div>
</template>

<script>
import attachments from '@/components/attachments/attachments'
export default {
  name: 'home-attachments',
  inject: ['show'],
  props: ['blogs'],
  data () {
    return {
      fans: [],
      focused: [],
      user: {}
    }
  },
  methods: {
    goto () {
      this.$router.push({
        name: 'home'
      })
    }
  },
  provide () {
    return {
      show: this.show
    }
  },
  mounted () {
    let userStr = localStorage.user
    if (userStr) {
      this.user = JSON.parse(userStr)
      this.$axios.get(this.$host('/fans?id=' + this.user.userId)).then(res => {
        if (parseInt(res.data.code) === 200) {
          this.fans = res.data.data
        }
      })
      this.$axios.get(this.$host('/focus?id=' + this.user.userId)).then(res => {
        if (parseInt(res.data.code) === 200) {
          this.focused = res.data.data
        }
      })

      if (typeof this.user.profilePicture === 'undefined' || this.user.profilePicture == null || this.user.profilePicture === '') {
        this.user.profilePicture = '/static/img/default_profile_picture.jpg'
      }
    }
  },
  components: {
    attachments
  }
}
</script>

<style scoped>
  .main{
    width: 90vw;
    height: 27.5vh;
    position: absolute;
    top: 13vh;
    left: 5vw;
    background-color: white;
  }
  .content{
    position: relative;
    left: 3vw;
    top: -6.5vh;
    width: 14vw;
  }
  .pic{
    width: 100%;
    height: 25vh;
    cursor: pointer;
  }
  .msg{
    height: 9vh;
    width: 100%;

    display:-moz-box;
    display:-webkit-box;
    display:-ms-flexbox;
    display:-webkit-flex;
    display:flex;
  }
  .info{
    width: 4.66vw;
    border-right:1px solid #778464;
    height: 5vh;
    margin: 2vh 0;
  }
  .info p{
    width: 100%;
    text-align: center;
  }
  .name{
    height: 1.5vh;
    line-height: 1.5vh;
    font-size: 1vh;
  }
  .num{
    height: 3.5vh;
    line-height: 3.5vh;
    font-size: 2.5vh;
  }
  .nickname{
    position: absolute;
    left: 20vw;
    top: 5vh;
    font-size: 3vh;
    font-weight: bold;
  }
</style>
