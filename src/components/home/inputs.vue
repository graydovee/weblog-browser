<template>
  <div>
    <p class="title">有什么新鲜事儿？</p>
    <textarea class="in" name="content" v-model="content"></textarea>
    <div class="pic">
      <div class="bottom" @click="show_pic">
        <p>图片</p>
        <img src="../../assets/img/picture.png" alt="">
      </div>
      <input type="text" style="height: 3vh" name="picture" v-show="pic_in" v-model="temp" @keydown.enter="add_pic" placeholder="请输入图片链接">
      <p class="picture_info">{{picture}}</p>
    </div>
    <button class="btn" @click="addblog">发表</button>
  </div>
</template>

<script>
export default {
  name: 'input',
  data () {
    return {
      content: '',
      picture: '',
      temp: '',
      pic_in: false
    }
  },
  methods: {
    addblog () {
      if (this.content) {
        if (this.pic_in) {
          this.$parent.show('请确认图片', false)
          return
        }
        let content = {
          content: this.content,
          picture: this.picture
        }
        let data = {
          content: JSON.stringify(content)
        }
        this.$axios.post(this.$host('/admin/blog'), this.$qs.stringify(data)).then(res => {
          if (parseInt(res.data.code) === 200) {
            this.$parent.updateBlog()
            this.$parent.show('发表成功')
            this.picture = ''
            this.content = ''
            this.temp = ''
          } else {
            this.$parent.show('发表失败', false)
          }
        }).catch(err => {
          console.log(err)
          if (err.response.status === 403) {
            this.$parent.show('登录已失效', false)
            this.$router.push({name: 'login'})
          } else {
            this.$parent.show('服务器繁忙', false)
          }
        })
      } else {
        this.$parent.show('请填写文章内容', false)
      }
    },
    show_pic () {
      this.pic_in = !this.pic_in
    },
    add_pic () {
      this.picture = this.temp
      this.pic_in = false
    }
  }
}
</script>

<style scoped>
  .title{
    line-height: 4vh;
    color: #778464;
    padding-left: 1vw;
    font-size: 14px;
  }
  .in{
    resize: none;
    width: 44vw;
    margin-left: 1vw;
    height: 10vh;
    padding: 1vh 2vw;
  }
  .pic{
    display:-moz-box;
    display:-webkit-box;
    display:-ms-flexbox;
    display:-webkit-flex;
    display:flex;
  }
  .bottom{
    margin-left: 1vw;

    display:-moz-box;
    display:-webkit-box;
    display:-ms-flexbox;
    display:-webkit-flex;
    display:flex;
    cursor: pointer;
    width: 4vw;
  }
  .bottom p{
    color: #778464;
    margin: 0.5vh 0;
    font-size: 12px;
  }
  .bottom img{
    width: 2vw;
  }
  .btn {
    width: 4vw;
    height: 3vh;
    background-color: #ff5e2f;
    color: white;
    border: 0;
    cursor: pointer;
    position: absolute;
    top: 22vh;
    left: 65vw;
  }
  .picture_info{
    font-size: 14px;
    width: 20vw;
    line-height: 3vh;
    display: inline;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
