<template>
    <div>
      <div class="content" id="profile">
        <div id="profile-bg"></div>
        <img :src="user.profilePicture" alt="" id="profile-picture" @click="goto">
        <p id="username">{{user.nickname}}</p>
        <p id="sign">{{user.sign ? user.sign : '想说点什么哟~'}}</p>
        <div id="focus">
          <div class="f-c">
            <p>粉丝</p>
            <p>{{fans.length}}</p>
          </div>
          <div class="f-c">
            <p>关注</p>
            <p>{{focused.length}}</p>
          </div>
          <div class="f-c">
            <p>文章</p>
            <p>{{blogNumber}}</p>
          </div>
        </div>
        <div class="line" id="line1"></div>
        <div class="line" id="line2"></div>
      </div>
      <message :focused="focused" :user="user"></message>
    </div>
</template>

<script>
import message from '@/components/home/message'

export default {
  name: 'profile',
  data () {
    return {
      user: {},
      fans: [],
      focused: [],
      birth: ''
    }
  },
  methods: {
    goto () {
      this.$router.push({
        name: 'visit',
        query: {
          id: this.user.userId
        }
      })
    }
  },
  inject: ['show'],
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
    message
  },
  props: ['blogNumber']
}
</script>

<style scoped>
  .content{
    background-color: white;
    margin-bottom: 1vh;
  }
  #profile{
    width: 100%;
    height: 25vh;
  }
  #profile-bg{
    background-image: url("/static/img/bg.jpg");
    background-size: cover;
    width: 100%;
    height: 8vh;
  }
  #profile-picture{
    width: 4vw;
    height: 4vw;
    border-radius: 50%;
    position: relative;
    left: 8vw;
    top: -4vh;
    cursor: pointer;
  }
  #username{
    width: 20vw;
    font-size: 18px;
    font-weight: bolder;
    text-align: center;
    position: relative;
    top: -4vh;
  }
  #sign{
    font-size: 12px;
    color: #52565b;
    text-align: center;
    position: relative;
    top: -4vh;
  }
  #focus{
    display: flex;
    position: relative;
    top: -4vh;
    width: 12vw;
    padding-left: 4vw;
  }
  .f-c{
    text-align: center;
    width: 33.3%;
    font-weight: bold;
  }
  .line{
    width: 1px;
    height: 3vh;
    background-color: #52565b;
    position: absolute;
  }
  #line1{
    left: 40%;
    top: 19vh
  }
  #line2{
    left: 60%;
    top: 19vh
  }
</style>
