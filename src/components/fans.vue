<template>
    <div id="box">
      <div class="info">
        <img class="img" src="../../static/img/default_profile_picture.jpg" alt="" v-if="!img">
        <img class="img" :src="img" alt="" v-if="img">
      </div>
      <p id="nickname">{{name}}</p>
    </div>
</template>

<script>
export default {
  name: 'fans',
  props: ['img', 'name']
}
</script>

<style scoped>
#box{
  width: 25%;
}
.img{
  width: 50%;
  margin: 0 25%;
}
#nickname{
  width: 100%;
  text-align: center;
  font-size: 12px;
}
</style>
