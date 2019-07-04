<template>
  <div id="app">
    <router-view/>
    <tis ref="tis"></tis>
  </div>
</template>

<script>
import tis from '@/components/tis'

export default {
  name: 'App',
  components: {
    tis
  },
  provide () {
    return {
      show: this.show
    }
  },
  methods: {
    show (msg, flag) {
      this.$refs.tis.show(msg, flag)
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
