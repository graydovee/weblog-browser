<template>
  <div>
    <form id="form-register">

      <div class="input-line">
        <div class="prefix">
          <img src="../../assets/admin/username.png" alt="">
        </div>
        <div class="input-box">
          <input type="text" name="username" placeholder="用户名">
        </div>
      </div>

      <div class="input-line">
        <div class="prefix">
          <img src="../../assets/admin/nickname.png" alt="">
        </div>
        <div class="input-box">
          <input type="text" name="nickname" placeholder="昵称">
        </div>
      </div>

      <div class="input-line">
        <div class="prefix">
          <img src="../../assets/admin/password.png" alt="">
        </div>
        <div class="input-box">
          <input type="password" name="password" placeholder="密码">
        </div>
      </div>

      <div class="input-line">
        <div class="prefix">
          <img src="../../assets/admin/password2.png" alt="">
        </div>
        <div class="input-box">
          <input type="password" name="repeat" placeholder="重复密码">
        </div>
      </div>
      <button class="admin-btn">注册</button>
    </form>
  </div>
</template>

<script>
import '@/../static/css/admin.css'
export default {
  name: 'register'
}
</script>

<style scoped>

</style>
