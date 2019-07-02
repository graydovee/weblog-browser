<template>
  <div class>
    <div class="bg"></div>
    <div class="content" id="input">
      <inputs></inputs>
    </div>
    <div class="content" id="title">
      <p style="border-right: 1px solid #778464">全部文章</p>
      <p>附件库</p>
    </div>
    <div class="content" id="blog" v-for="(b,i) in blogs" :key="i" >
      <blog :blog="b"></blog>
    </div>
    <div id="message">
      <message :blogNumber="blogs.length"></message>
    </div>
  </div>
</template>

<script>
import message from '@/components/home/message'
import inputs from '@/components/home/inputs'
import blog from '@/components/home/weblog'

export default {
  name: 'home',
  data () {
    return {
      blogs: []
    }
  },
  inject: ['show'],
  components: {
    message,
    inputs,
    blog
  },
  methods: {
    updateBlog () {
      console.log(localStorage.user)
      let userStr = localStorage.user
      if (userStr) {
        this.user = JSON.parse(userStr)

        this.$axios.get(this.$host('/blog?userId=' + this.user.userId)).then(res => {
          if (parseInt(res.data.code) === 200) {
            this.blogs = res.data.data
          }
        })
      }
    }
  },
  mounted () {
    this.updateBlog()
  }
}
</script>

<style scoped>
  .bg{
    background-image: url("../../assets/img/bg.jpg");
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -99;
  }
  .content{
    background-color: white;
    margin-bottom: 1vh;
  }
  #input{
    width: 50vw;
    height: 21vh;
    margin-left: 20vw;
    margin-top: 5vh
  }
  #title{
    width: 50vw;
    height: 5vh;
    margin-left: 20vw;
    display: flex;
  }
  #title p{
    color: #778464;
    margin: 0.5vh 0;
    cursor: pointer;
    padding: 0 1vw;
    line-height: 4vh;
    font-size: 15px;
  }
  #blog{
    width: 50vw;
    margin-left: 20vw;
    display: flex;
  }
  #message{
    position: absolute;
    width: 20vw;
    left: 71vw;
    top: 5vh;
    height: 65vh;
  }
</style>
