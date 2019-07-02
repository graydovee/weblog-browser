<template>
  <div>
    <form id="form-register">

      <div class="input-line">
        <div class="prefix">
          <img src="../../assets/admin/username.png" alt="">
        </div>
        <div class="input-box">
          <input type="text" name="username" placeholder="用户名" v-model="username">
        </div>
      </div>

      <div class="input-line">
        <div class="prefix">
          <img src="../../assets/admin/nickname.png" alt="">
        </div>
        <div class="input-box">
          <input type="text" name="nickname" placeholder="昵称" v-model="nickname">
        </div>
      </div>

      <div class="input-line">
        <div class="prefix">
          <img src="../../assets/admin/password.png" alt="">
        </div>
        <div class="input-box">
          <input type="password" name="password" placeholder="密码" v-model="password">
        </div>
      </div>

      <div class="input-line">
        <div class="prefix">
          <img src="../../assets/admin/password2.png" alt="">
        </div>
        <div class="input-box">
          <input type="password" name="repeat" placeholder="重复密码" v-model="repeat">
        </div>
      </div>
      <button class="admin-btn" type="button" @click="register">注册</button>
    </form>
  </div>
</template>

<script>
import '@/../static/css/admin.css'
export default {
  name: 'register',
  data () {
    return {
      username: '',
      nickname: '',
      password: '',
      repeat: ''
    }
  },
  inject: ['show'],
  methods: {
    register () {
      if (!(this.username && this.password && this.nickname && this.repeat)) {
        this.show('请完整填写信息', false)
      } else if (this.password !== this.repeat) {
        this.show('两次密码不一致', false)
      } else {
        let data = {
          username: this.username,
          password: this.password,
          nickname: this.nickname
        }

        this.$axios.post(this.$host('/auth'), this.$qs.stringify(data))
          .then(res => {
            if (parseInt(res.data.code) === 200) {
              this.show('注册成功')
              this.$router.push({name: 'login'})
            } else {
              this.show('注册失败', false)
            }
          })
          .catch(err => {
            console.error(err)
            this.show('注册失败', false)
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
