<template>
    <div>
      <maskbox></maskbox>
      <div class="upload">
        <div class="title">上传文件</div>
        <div class="close" @click="close">×</div>
        <div class="up" @click="file_open">
          <div class="img_"></div>
          <div class="content">点击上传文件</div>
          <input type="file" id="file" @change="file_upload">
        </div>
      </div>
    </div>
</template>

<script>
import maskbox from '@/components/attachments/maskbox'
export default {
  name: 'upload',
  components: {
    maskbox
  },
  inject: ['show'],
  methods: {
    close () {
      this.$parent.openUpload()
    },
    file_open () {
      document.getElementById('file').click()
    },
    file_upload (ev) {
      let file = ev.target.files[0]
      if (typeof FileReader !== 'undefined') {
        if ((file.type).indexOf('image/') === -1) {
          this.show('请上传图片!', false)
        } else {
          let param = new FormData()
          if (file) {
            let config = {
              // 添加请求头
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              // 添加上传进度监听事件
              onUploadProgress: e => {
                let completeProgress = ((e.loaded / e.total * 100) | 0) + '%'
                this.progress = completeProgress
              }
            }
            param.append('file', file)
            this.$axios.post(this.$host('/admin/file'), param, config)
              .then(res => {
                console.log(res)
                if (res.data.code === 200) {
                  this.show('上传成功')
                  this.$parent.updateItem()
                } else {
                  this.show('上传失败')
                }
              })
              .catch(err => {
                console.error(err)
                if (err.response.status === 403) {
                  this.$parent.show('登录已失效', false)
                  this.$router.push({name: 'login'})
                } else {
                  this.$parent.show('服务器繁忙', false)
                }
              })
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .upload{
    width: 62vw;
    height: 65vh;
    position: fixed;
    border-radius: 5px;
    background-color: white;
    left: 19vw;
    z-index: 99;
    top: 15vh;
  }
  .title{
    width: 60vw;
    margin: 0 1vh;
    border-bottom: #778464 1px solid;
    text-align: center;
    height: 7vh;
    line-height: 7vh;
    font-size: 3vh;
    color: #778464;
  }
  .close{
    position: fixed;
    left: 77.5vw;
    font-size: 5vh;
    line-height: 7vh;
    top: 15vh;
    color: #778464;
    cursor: pointer;
  }
  .up{
    border: #778464 dashed 5px;
    width: 56vw;
    height: 42vh;
    margin: 5.5vh 3vw;
    cursor: pointer;
  }
  .img_{
    background-image: url("/static/img/file.jpg");
    background-size: cover;
    height: 15vh;
    width: 6vw;
    margin: 10vh 0 0 25vw;
  }
  .content{
    color: #778464;
    cursor: pointer;
    text-align: center;
    font-size: 3vh;
    line-height: 5vh;
    margin-top: 3vh;
  }
  #file{
    display: none;
  }
</style>
