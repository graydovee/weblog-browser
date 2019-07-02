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

Vue.prototype.$host = function (url) {
  const host = 'http://10.30.90.15:8083'
  return host + url
}

Vue.filter('dateFormat', (dataStr) => {
  let time = new Date(dataStr)
  function timeAdd0 (str) {
    if (str < 10) {
      str = 0 + str
    }
    return str
  }
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted () {
    let token = localStorage.getItem('token')
    if (token) {
      this.$axios.defaults.headers.common['Authorization'] = token
      console.log('token already set' + localStorage.token)
      this.$axios.get(this.$host('/admin/auth')).then(res => {
        if (parseInt(res.data.code) === 200) {
          let data = res.data
          if (data.data) {
            localStorage.user = JSON.stringify(data.data)
            this.$router.push({name: 'home'})
            return
          }
        }
        this.$router.push({name: 'login'})
      }).catch(err => {
        console.log(err)
        this.$router.push({name: 'login'})
      })
    }
  }
})
