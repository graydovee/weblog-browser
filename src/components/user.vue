<template>
    <div id="box" @click="goto">
      <div class="info">
        <img class="img" src="../../static/img/default_profile_picture.jpg" alt="" v-if="!user.profilePicture">
        <img class="img" :src="user.profilePicture" alt="" v-if="user.profilePicture">
      </div>
      <p id="nickname">{{user.nickname}}</p>
    </div>
</template>

<script>
export default {
  name: 'fans',
  props: ['user'],
  methods: {
    goto () {
      this.$router.push({
        name: 'visit',
        query: {
          id: this.user.userId
        }
      })
    }
  }
}
</script>

<style scoped>
#box{
  width: 25%;
  cursor: pointer;
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
