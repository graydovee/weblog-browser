<template>
  <div >
    <div id="bg-head">
      <div class="profile-picture">
        <img :src="user_v.profilePicture" alt="">
      </div>
      <div class="nickname label">{{user_v.nickname}}</div>
      <div class="sign label">{{user_v.sign ? user_v.sign : '想说点什么哟~'}}</div>
      <div class="msg">
        <div class="msg-box">
          <p class="msg-content label">{{fans_v.length}}</p>
          <p class="msg-label label">粉丝</p>
        </div>
        <div class="msg-box">
          <p class="msg-content label">{{focused_v.length}}</p>
          <p class="msg-label label">关注</p>
        </div>
        <div class="msg-box">
          <p class="msg-content label">{{blogs_v.length}}</p>
          <p class="msg-label label">文章</p>
        </div>
      </div>
      <div class="focus label" @click="focused">{{focus_status === 1 ? '关注' : '已关注'}}</div>
    </div>
    <div id="bg-bottom"></div>
    <router-view :focused_v="focused_v" :user_v="user_v" :blogs_v="blogs_v"></router-view>
  </div>
</template>

<script>
export default {
  name: 'visit',
  data () {
    return {
      fans_v: [],
      focused_v: [],
      user_v: {},
      blogs_v: [],
      focus_status: 0
    }
  },
  inject: ['show'],
  provide () {
    return {
      show: this.show
    }
  },
  methods: {
    goto () {
      this.$router.push({
        name: 'attachments',
        query: {
          id: this.$route.query.id
        }
      })
    },
    focused () {
      if (this.focus_status === 1) {
        let data = {
          id: this.$route.query.id
        }
        this.$axios.post(this.$host('/admin/focus'), this.$qs.stringify(data)).then(res => {
          if (res.data.code === 200) {
            this.show('关注成功')
            this.focus_status = 0
          } else {
            this.show('关注失败', false)
          }
        }).catch(err => {
          console.log(err)
          this.show('请先登陆', false)
        })
      }
    },
    update () {
      this.$axios.get(this.$host('/user?id=' + this.$route.query.id)).then(res => {
        if (parseInt(res.data.code) === 200) {
          this.user_v = res.data.data
          if (typeof this.user_v.profilePicture === 'undefined' || this.user_v.profilePicture == null || this.user_v.profilePicture === '') {
            this.user_v.profilePicture = '/static/img/default_profile_picture.jpg'
          }

          this.$axios.get(this.$host('/fans?id=' + this.$route.query.id)).then(res2 => {
            if (parseInt(res2.data.code) === 200) {
              this.fans_v = res2.data.data
            }
          })
          this.$axios.get(this.$host('/focus?id=' + this.$route.query.id)).then(res2 => {
            if (parseInt(res2.data.code) === 200) {
              this.focused_v = res2.data.data
            }
          })

          this.$axios.get(this.$host('/blog?id=' + this.$route.query.id)).then(res2 => {
            if (parseInt(res2.data.code) === 200) {
              this.blogs_v = res2.data.data
            }
          })
        }
      })
    }
  },
  mounted () {
    this.update()
    this.$axios.get(this.$host('/admin/auth')).then(res => {
      if (res.data.code === 200) {
        let user = res.data.data
        if (user.userId === this.$route.query.id) {
          return
        }
        this.$axios.get(this.$host('/focus?id=' + user.userId)).then(res2 => {
          if (parseInt(res2.data.code) === 200) {
            let users = res2.data.data
            this.focus_status = 1

            for (let i = 0; i < users.length; ++i) {
              if (users[i].userId === this.$route.query.id) {
                this.focus_status = 0
                return
              }
            }
          }
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
  #bg-head{
    position: absolute;
    width: 100%;
    height: 40%;
    background-image: url("/static/img/bg.jpg");
    z-index: -98;
  }
  #bg-bottom{
    background-color: #e4e7cf;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -99;
  }
  .profile-picture{
    position: absolute;
    background-color: rgba(59,117,121,0.75);
    width: 8vw;
    height: 8vw;
    border-radius: 50%;
    top: 4vh;
    left: 46vw;
  }
  .profile-picture img{
    border-radius: 50%;
    width: 7vw;
    height: 7vw;
    margin: 0.5vw 0.5vw;
  }
  .label{
    color: white;
    text-align: center;
  }
  .nickname{
    position: absolute;
    width: 8vw;
    left: 46vw;
    top: 20vh;
    font-size: 28px;
  }
  .sign{
    position: absolute;
    width: 8vw;
    left: 46vw;
    top: 25vh;
    font-size: 14px;
  }
  .msg{
    width: 21vw;
    height: 6vh;
    display: flex;
    position: absolute;
    left: 39.5vw;
    top: 28vh
  }
  .msg-box{
    background-color: rgba(59,117,121,0.75);
    width: 5vw;
    height: 6vh;
    margin: 0 1vw;
  }
  .msg-label{
    font-size: 1vh;
    line-height: 2vh;
  }
  .msg-content{
    font-size: 3vh;
    line-height: 4vh;
  }
  .focus{
    background-color: #ff5e2f;
    width: 5vw;
    height: 3vh;
    border-radius: 1vh;
    font-size: 14px;
    position: absolute;
    left: 47.5vw;
    top: 35vh;
    line-height: 3vh;
    cursor: pointer;
  }
</style>
