<template>
  <div class>
    <div class="bg"></div>
    <router-view :blogs="blogs"></router-view>
  </div>
</template>

<script>
export default {
  name: 'home',
  inject: ['show'],
  data () {
    return {
      blogs: []
    }
  },
  provide () {
    return {
      show: this.show
    }
  },
  methods: {
    updateBlog () {
      console.log(localStorage.user)
      let userStr = localStorage.user
      if (userStr) {
        this.user = JSON.parse(userStr)

        this.$axios.get(this.$host('/blog?id=' + this.user.userId)).then(res => {
          if (parseInt(res.data.code) === 200) {
            this.blogs = res.data.data
            this.$forceUpdate()
          }
        })
      }
    },
    goto () {
      this.$router.push(
        {
          name: 'home_attachments'
        }
      )
    }
  },
  mounted () {
    this.updateBlog()
  }
}
</script>

<style scoped>
  .bg{
    background-image: url("/static/img/bg.jpg");
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -99;
  }
</style>
