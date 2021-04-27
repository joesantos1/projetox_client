import Vue from 'vue'
import Router from 'vue-router'
import Dash from '@/components/Dash'
import Login from '@/components/Login'
import authVUSER from '../services/auth'
import RedeUnilevel from '@/components/RedeUnilevel'
import RedeDireta from '@/components/MeusDiretos'
import Cadastro from '@/components/Cadastro'

Vue.use(Router)

let TOKEN_USER = localStorage.getItem('access_token');

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DashBoad',
      component: Dash
    },
    {
      path: '/redeunilevel',
      name: 'RedeUnilevel',
      component: RedeUnilevel
    },
    {
      path: '/meusdiretos',
      name: 'RedeDireta',
      component: RedeDireta
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastro
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to,from,next) => {
        
        if(TOKEN_USER){
          
          next({name: 'DashBoad'})
        }else{
          next()
        }
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Login,
      beforeEnter: (to, from, next) => {
        if(TOKEN_USER){
          localStorage.removeItem('access_token')
          localStorage.removeItem('_user')
          location.replace('/login')
        }else{
          next({name: 'DashBoad'})
        }
      }
    }
  ]
})



router.beforeEach(async (to, from, next) => {

  var isAuthenticated = await authVUSER.authVerification();

  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router;