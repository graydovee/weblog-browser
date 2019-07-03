<template>
  <div class>
    <div class="content" id="input">
      <inputs></inputs>
    </div>
    <div class="content" id="title">
      <p style="border-right: 1px solid #778464" >全部文章</p>
      <p @click="goto">附件库</p>
    </div>
    <div class="content" id="blog" v-for="(b) in blogs" :key="b.blogId" >
      <blog :blog="b"></blog>
    </div>
    <div id="message">
      <profile :blogNumber="blogs.length"></profile>
    </div>
  </div>
</template>

<script>
import profile from '@/components/home/profile'
import inputs from '@/components/home/inputs'
import blog from '@/components/weblog'

export default {
  name: 'details',
  inject: ['show'],
  props: ['blogs'],
  components: {
    profile,
    inputs,
    blog
  },
  methods: {
    updateBlog () {
      this.$parent.updateBlog()
    },
    goto () {
      this.$router.push(
        {
          name: 'home_attachments'
        }
      )
    }
  }
}
</script>

<style scoped>
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
