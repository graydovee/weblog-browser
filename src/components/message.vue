<template>
  <div>
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
        <span v-if="!update">{{user.birth | dateFormat}}</span>
        <input type="text" v-if="update" v-model="birth">
      </div>
      <div class="msg label">性别：
        <span v-if="!update">{{parseInt(user.sex) === 1 ? '女': '男'}}</span>
        <select v-model="user.sex" v-if="update">
          <option value="0">男</option>
          <option value="1">女</option>
        </select>
      </div>
      <button class="btn" @click="do_update" v-if="$route.path.startsWith('/home')">{{update ? '确认' : '修改'}}</button>
    </div>
    <div class="content" id="fans">
      <p class="label fans-title">关注</p>
      <div class="fans-pic">
        <userProfile v-for="(f,i) in focused" :key="i" :user="f"></userProfile>
      </div>
    </div>
  </div>
</template>

<script>
import userProfile from '@/components/user'

export default {
  name: 'message',
  data () {
    return {
      update: false,
      birth: '',
      dateStr: ''
    }
  },
  components: {
    userProfile
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
        this.$axios.post(this.$host('/admin/auth'), this.$qs.stringify(data)).then(res => {
          if (parseInt(res.data.code) === 200) {
            this.$parent.show('修改成功')
            this.user.birth = data.birthTime
            this.sex = data.sex
            localStorage.user = JSON.stringify(this.user)
          } else {
            this.$parent.show('修改失败', false)
          }
        }).catch(err => {
          console.log(err)
          if (err.response.status && err.response.status === 403) {
            this.$parent.show('登录已失效', false)
            this.$router.push({name: 'login'})
          } else {
            this.$parent.show('服务器繁忙', false)
          }
        })
      } else {
        let filter = this.$options.filters['dateFormat']
        this.birth = filter(this.user.birth)
      }
      this.update = !this.update
    }
  },
  mounted () {

  },
  props: ['user', 'focused']
}
</script>

<style scoped>
  .content{
    background-color: white;
    margin-bottom: 1vh;
  }
  #details{
    width: 100%;
    height: 20vh;
  }
  #fans{
    width: 100%;
    height: 20vh;
  }

  .introduce{
    line-height: 4.7vh;
    padding-left: 2vw;
  }
  .msg{
    margin:0 2vw;
    line-height: 3.5vh;
    border-top: 2px solid #eaeaaf;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    position: relative;
    top: -3vh;
    left: 14vw;
  }
</style>
