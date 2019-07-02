<template>
  <div>
    <div class="content" id="profile">
      <div id="profile-bg"></div>
      <img :src="user.profilePicture" alt="" id="profile-picture">
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
    <div class="content" id="details">
      <div class="introduce label">个人信息</div>
      <div class="msg label">昵称：
        <span v-if="!update">{{user.nickname}}</span>
        <input type="text" v-if="update" v-model="user.nickname">
      </div>
      <div class="msg label">签名：
        <span v-if="!update">{{user.sign}}</span>
        <input type="text" v-if="update" v-model="user.sign">
      </div>
      <div class="msg label">生日：
        <span v-if="!update">{{birth}}</span>
        <input type="text" v-if="update" v-model="birth">
      </div>
      <div class="msg label">性别：
        <span v-if="!update">{{parseInt(user.sex) === 1 ? '女': '男'}}</span>
        <select v-model="user.sex" v-if="update">
          <option value="0">男</option>
          <option value="1">女</option>
        </select>
      </div>
      <button class="btn" @click="do_update">{{update ? '确认' : '修改'}}</button>
    </div>
    <div class="content" id="fans">
      <p class="label fans-title">粉丝</p>
      <div class="fans-pic" v-for="(f,i) in fans" :key="i">
        <fans :name="f.nickname" :img="f.profilePicture"></fans>
      </div>
    </div>
  </div>
</template>

<script>
import fans from '@/components/fans'

export default {
  name: 'message',
  data () {
    return {
      user: {},
      fans: [],
      focused: [],
      update: false,
      birth: '',
      dateStr: ''
    }
  },
  components: {
    fans
  },
  methods: {
    do_update () {
      if (this.update) {
        let str = this.birth
        str = str.replace(/-/g, '/')
        let date = new Date(str)
        let data = {
          nickname: this.user.nickname,
          sign: this.user.sign,
          sex: this.user.sex,
          birthTime: date.getTime()
        }
        alert(JSON.stringify(data))
        this.$axios.post(this.$host('/admin/auth'), this.$qs.stringify(data)).then(res => {
          if (parseInt(res.data.code) === 200) {
            this.$parent.show('修改成功')
          } else {
            this.$parent.show('修改失败', false)
          }
        }).catch(err => {
          console.log(err)
          if (err.response.status === 403) {
            this.$parent.show('登录已失效', false)
            this.$router.push({name: 'login'})
          } else {
            this.$parent.show('服务器繁忙', false)
          }
        })
      }
      this.update = !this.update
    }
  },
  mounted () {
    let userStr = localStorage.user
    if (userStr) {
      this.user = JSON.parse(userStr)
      this.$axios.get(this.$host('/fans?userId=' + this.user.userId)).then(res => {
        if (parseInt(res.data.code) === 200) {
          this.fans = res.data.data
        }
      })
      this.$axios.get(this.$host('/focus?userId=' + this.user.userId)).then(res => {
        if (parseInt(res.data.code) === 200) {
          this.focused = res.data.data
        }
      })
      let filter = this.$options.filters['dateFormat']
      this.birth = filter(this.user.birth)
      if (typeof this.user.profilePicture === 'undefined' || this.user.profilePicture == null || this.user.profilePicture === '') {
        this.user.profilePicture = '/static/img/default_profile_picture.jpg'
      }
    }
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
  #details{
    width: 100%;
    height: 20vh;
  }
  #fans{
    width: 100%;
    height: 20vh;
  }
  #profile-bg{
    background-image: url("../../assets/img/bg.jpg");
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
  .introduce{
    line-height: 4.7vh;
    padding-left: 2vw;
  }
  .msg{
    margin:0 2vw;
    line-height: 3.5vh;
    border-top: 2px solid #eaeaaf;
  }
  .label{
    font-weight: bold;
    color: #778464;
  }
  .fans-title{
    margin-left:  2vw;
    line-height: 4vh;
  }
  .fans-pic{
    display:-moz-box;
    display:-webkit-box;
    display:-ms-flexbox;
    display:-webkit-flex;
    display:flex;
    flex-wrap: wrap;

    background-color: white;
  }
  .btn{
    width: 4vw;
    height: 3vh;
    background-color: #ff5e2f;
    color: white;
    border: 0;
    cursor: pointer;
    position: absolute;
    top: 42vh;
    left: 14vw;
  }
</style>
