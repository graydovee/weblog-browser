<template>
    <div>
      <div class="main">
        <div class="msg">
          <message :focused="focused_v" :user="user_v"></message>
        </div>
        <div class="blog">
          <div class="content" id="title">
            <p style="border-right: 1px solid #778464">全部文章</p>
            <p>附件库</p>
          </div>
          <div class="content" id="blog" v-for="(b,i) in blogs_v" :key="i" >
            <blog :blog="b"></blog>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import message from '@/components/home/message'
import blog from '@/components/home/weblog'

export default {
  name: 'details',
  components: {
    message,
    blog
  },
  methods: {
    show (msg, flag) {
      this.$parent.show(msg, flag)
    }
  },
  props: ['focused_v', 'user_v', 'blogs_v']
}
</script>

<style scoped>
  .main{
    position: absolute;
    top: 40%;
    width: 100%;
    display: flex;
  }
  .content{
    background-color: white;
    margin-bottom: 1vh;
  }
  .main{
    margin-top: 5vh;
  }
  .msg{
    margin-left: 10vw;
    width: 20vw;
  }
  .blog{
    margin-left: 2vw;
    width: 50vw;
  }
  #title{
    width: 50vw;
    height: 5vh;
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
</style>
