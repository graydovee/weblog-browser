<template>
    <div>
      <div class="like">
        <div>
          <img src="../../assets/img/like.png" alt="">
        </div>
        <p>点赞数：{{like.length}}</p>
      </div>
      <div class="main">
        <img :src="user.profilePicture" alt="" class="profile_picture">
        <div class="content">
          <p class="username">{{user.nickname}}</p>
          <p class="time">{{blog.createTime | dateFormat}}</p>
          <p class="content">{{content.content}}</p>
          <img :src="content.picture" alt="" class="picture" v-if="content.picture">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'blog',
  data () {
    return {
      user: {},
      like: [],
      content: {}
    }
  },
  props: ['blog'],
  mounted () {
    this.content = JSON.parse(this.blog.content)
    this.$axios.get(this.$host('/user?userId=' + this.blog.userId)).then(res => {
      if (parseInt(res.data.code) === 200) {
        this.user = res.data.data
        if (typeof this.user.profilePicture === 'undefined' || this.user.profilePicture == null || this.user.profilePicture === '') {
          this.user.profilePicture = '/static/img/default_profile_picture.jpg'
        }
      }
    })
    this.$axios.get(this.$host('/like?blogId=' + this.blog.blogId)).then(res => {
      if (parseInt(res.data.code) === 200) {
        this.like = res.data.data
      }
    })
  }
}
</script>

<style scoped>
  .profile_picture{
    width: 7.5vh;
    height: 7.5vh;
    border-radius: 50%;
    margin-right: 2vw;
  }
  .main{
    display:-moz-box;
    display:-webkit-box;
    display:-ms-flexbox;
    display:-webkit-flex;
    display:flex;
    padding-top: 2vh
  }
  .username{
    margin-top: 1vh;
    font-size: 18px;
    font-weight: bold;
  }
  .time{
    margin-top: 1vh;
    font-size: 12px;
    color: #52565b;
  }
  .content{
    margin-top: 1vh;
    font-size: 14px;
    margin-bottom: 2vh;
  }
  .picture{
    height: 20vh;
  }
  .like{
    position: relative;
    float: left;
    width: 6vw ;
    left: 42vw;
    top: 3vh;
  }
  .like div{
    width: 2vw;
    height: 2vw;
    margin: 0 2vw;
    border-radius: 50%;
    background-color: #ff5e2f;
  }
  .like div img{
    width: 2vw;
    height: 1.5vw;
    position: relative;
    top: 0.3vw;
  }
  .like p{
    margin-top: 1vh;
    font-size: 12px;
    text-align: center;
    color: #ff5e2f;
  }
</style>
