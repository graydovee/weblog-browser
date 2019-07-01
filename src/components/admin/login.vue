<template>
  <div>
    <form id="form-login">

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
          <img src="../../assets/admin/password.png" alt="">
        </div>
        <div class="input-box">
          <input type="password" name="password" placeholder="密码" v-model="password">
        </div>
      </div>
      <button class="admin-btn" type="button" @click="login">登录</button>
    </form>
  </div>
</template>

<script>
import '@/../static/css/admin.css'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  inject: ['show'],
  methods: {
    login () {
      let data = {
        username: this.username,
        password: this.password
      }
      this.$axios.post('http://localhost:8083/auth/login', this.$qs.stringify(data)).then(res => {
        let token = res.headers.token
        localStorage.token = token
        this.$axios.defaults.headers.common['Authorization'] = token
        this.show('登录成功')
      }).catch(err => {
        console.log(err)
        this.show('登录失败', false)
      })
    }
  }
}
</script>

<style scoped>

</style>
