<template>
    <div class="box">
      <img :src="url" alt="" class="img">
    </div>
</template>

<script>
export default {
  name: 'file',
  props: ['item', 'admin'],
  computed: {
    url () {
      if (this.admin) {
        return '/static/img/new.jpg'
      } else if (this.item.format === 'jpg' || this.item.format === 'png' || this.item.format === 'gif' || this.item.format === 'bmp') {
        return this.$host('/' + this.item.itemsId + '/' + this.item.uuid)
      } else {
        return '/static/img/file.jpg'
      }
    }
  }
}
</script>

<style scoped>
.box{
  width: 8.5vw;
  height: 15vh;
  margin: 5vh 3.75vw 0 3.75vw;
  cursor: pointer;
}
.img{
  width: 100%;
  height: 100%;
}
</style>
