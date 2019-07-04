<template>
    <div class="box" @click="open">
      <img :src="url" alt="" class="img">
    </div>
</template>

<script>
export default {
  name: 'file',
  props: ['item', 'admin'],
  methods: {
    open () {
      if (this.admin) {
        this.$parent.openUpload()
      } else {
        if (this.url && this.url !== '') {
          this.$parent.openShow(this.url)
        }
      }
    }
  },
  computed: {
    url () {
      if (this.admin) {
        return '/static/img/new.jpg'
      } else if (this.isImg) {
        return this.$host('/down/' + this.item.itemsId + '/' + this.item.uuid)
      } else {
        return '/static/img/file.jpg'
      }
    },
    isImg () {
      if (this.item.format === 'jpg' || this.item.format === 'png' || this.item.format === 'gif' || this.item.format === 'bmp') {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
.box{
  width: 8.5vw;
  height: 15vh;
  margin: 5vh 3.75vw 0 3.75vw;
}
.img{
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
