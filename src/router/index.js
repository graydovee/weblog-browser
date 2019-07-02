import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin/admin'
import login from '@/components/admin/login'
import register from '@/components/admin/register'
import visit from '@/components/visit/visit'
import home from '@/components/home/home'
import attachments from '@/components/visit/attachments'

Vue.use(Router)

export default new Router({
  routes: [
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
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/visit',
      name: 'visit',
      component: visit,
      children: [
        {
          path: 'attachments',
          name: 'attachments',
          component: attachments
        }
      ]
    }
  ]
})
