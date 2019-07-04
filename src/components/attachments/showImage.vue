<template>
    <div>
      <maskbox></maskbox>
      <div class="main">
        <div class="close" @click="close">×</div>
        <div class="imagebox">
          <div class="img">
            <img :src="url" alt="">
          </div>
        </div>
        <p class="p1">链接地址:</p>
        <p class="p2">{{url}}</p>
        <button type="button" class="set-profile" @click="set_profile_picture">设置为头像</button>
      </div>
    </div>
</template>

<script>
import maskbox from '@/components/attachments/maskbox'
export default {
  name: 'showImage',
  components: {
    maskbox
  },
  inject: ['show'],
  methods: {
    close () {
      this.$parent.openShow()
    },
    set_profile_picture () {
      let data = {
        url: this.url
      }
      this.$axios.post(this.$host('/admin/profile'), this.$qs.stringify(data)).then(res => {
        if (res.data.code === 200) {
          this.show('修改成功')
          this.$parent.user.profilePicture = this.url
          let user = JSON.parse(localStorage.user)
          user.profilePicture = this.url
          localStorage.user = JSON.stringify(user)
        } else {
          this.show('修改失败', false)
        }
      }).catch(err => {
        console.error(err)
        if (err.response.status === 403) {
          this.$parent.show('请先登录', false)
          this.$router.push({name: 'login'})
        } else {
          this.$parent.show('服务器繁忙', false)
        }
      })
    }
  },
  props: ['url']
}
</script>

<style scoped>
  .main{
    width: 62vw;
    height: 85vh;
    position: fixed;
    background-color: white;
    left: 19vw;
    z-index: 99;
    top: 8vh;
  }
  .close{
    position: fixed;
    left: 77.5vw;
    font-size: 5vh;
    line-height: 7vh;
    top: 8vh;
    color: #778464;
    cursor: pointer;
  }
  .imagebox{
    width: 48vw;
    height: 50vh;
    margin: 10vh 7vw 0 7vw;
    position: relative;
    display: flex;
  }
  .img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  img {
    height: 100%;
    width: auto;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .p1{
    margin: 5vh 7vw 0 10vw;
  }
  .p2{
    text-align: center;
    font-size: 2vh;
  }
  .set-profile{
    background-color: #fe5c30;
    cursor: pointer;
    border: 0;
    height: 5.5vh;
    width: 8vw;
    color: white;
    font-size: 2vh;
    position: relative;
    top: 3vh;
    left: 50vw;
  }
  .set-profile:hover{
    background-color: #ffb32f;
  }
</style>
