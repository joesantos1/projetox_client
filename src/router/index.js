import Vue from 'vue'
import Router from 'vue-router'
import Dash from '@/components/Dash'
import Login from '@/components/Login'
import authVUSER from '../services/auth'
import RedeUnilevel from '@/components/RedeUnilevel'
import RedeDireta from '@/components/MeusDiretos'
import Cadastro from '@/components/Cadastro'
import MeusDados from '@/components/MeusDados'
import CatalogoJobs from '@/components/Jobs'
import Arquivos from '@/components/Arquivos'
import NewPlayAcc from '@/components/NewPlayAcc'
import UpdPlayAcc from '@/components/UpdPlayAcc'
import NovaProposta from '@/components/Contratos'
import VerPropostas from '@/components/Propostas'

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
      path: '/propostas',
      name: 'Propostas',
      component: VerPropostas
    },
    {
      path: '/fazerproposta/:idp',
      name: 'NovaProposta',
      component: NovaProposta
    },
    {
      path: '/new-play-account',
      name: 'New Play-Acc',
      component: NewPlayAcc
    },
    {
      path: '/play-account/:id/:idagree',
      name: 'playacc',
      component: UpdPlayAcc
    },
    {
      path: '/catalogo',
      name: 'CatalogoJobs',
      component: CatalogoJobs
    },
    {
      path: '/meusdiretos',
      name: 'RedeDireta',
      component: RedeDireta
    },
    {
      path: '/meusdados',
      name: 'meusdados',
      component: MeusDados
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastro
    },
    {
      path: '/arquivos',
      name: 'arquivos',
      component: Arquivos
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