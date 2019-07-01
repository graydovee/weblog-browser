import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin/admin'
import login from '@/components/admin/login'
import register from '@/components/admin/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'admin'}
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      redirect: {name: 'login'},
      children: [
        {
          path: 'login',
          name: 'login',
          component: login
        },
        {
          path: 'register',
          name: 'register',
          component: register
        }
      ]
    }
  ]
})
