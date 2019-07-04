<template>
    <div id="main"></div>
</template>

<script>
export default {
  name: 'maskbox'
}
</script>

<style scoped>
#main{
  position: fixed;
  z-index: 98;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(175,175,175,0.75);
}
</style>
