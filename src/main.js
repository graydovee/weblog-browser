// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted () {
    let token = localStorage.getItem('token')
    if (token) {
      this.$qs.defaults.headers.common['Authorization'] = token
      console.log('token already set' + localStorage.token)
    }
  }
})
