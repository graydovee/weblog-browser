<template>
  <div>
    <upload v-if="upload_show"></upload>
    <showImage v-if="url!==''" :url="url"></showImage>
    <div class="box">
      <div class="main">
        <p class="title">附件库</p>
        <div class="content">
          <file v-if="admin" :admin="admin" class="file"></file>
          <file v-for="item in items" :key="item.itemId" :item="item" class="file"></file>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import file from '@/components/attachments/file'
import upload from '@/components/attachments/upload'
import showImage from '@/components/attachments/showImage'

export default {
  name: 'attachments',
  data () {
    return {
      items: [],
      upload_show: false,
      url: ''
    }
  },
  components: {
    file,
    upload,
    showImage
  },
  methods: {
    openUpload () {
      this.upload_show = !this.upload_show
    },
    openShow (url = '') {
      if (this.url === '') {
        this.url = url
      } else {
        this.url = ''
      }
    },
    updateItem () {
      this.$axios.get(this.$host('/file?id=' + this.user.userId)).then(res => {
        if (res.data.code === 200) {
          this.items = res.data.data
        }
      })
    }
  },
  props: ['admin', 'user'],
  inject: ['show'],
  provide () {
    return {
      show: this.show
    }
  },
  watch: {
    user () {
      this.updateItem()
    }
  }
}
</script>

<style scoped>
  .box{
    position: absolute;
    width: 90vw;
    left: 5vw;
    top: 42.5vh;
    height: 55.5vh;
    background-color: white;
  }
  .main{
    background-color: white;
  }
  .title{
    color: #335954;
    border-bottom: #778464 solid 1px;
    height: 5vh;
    line-height: 5vh;
    width: 60vw;
    margin: 0 auto;
    text-align: center;
  }
  .content{
    width: 80vw;
    margin: 0 5vw;

    display:-moz-box;
    display:-webkit-box;
    display:-ms-flexbox;
    display:-webkit-flex;
    display:flex;
    flex-wrap: wrap;
    background-color: white;
    padding-bottom: 5vh;
  }
  .file{
    position: relative;
    top: 0;
    left: 0;
  }
</style>
