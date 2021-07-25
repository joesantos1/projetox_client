import Vue from 'vue'
import Router from 'vue-router'
import Dash from '@/components/Dash'
import Login from '@/components/Login'
import authVUSER from '../services/auth'
import RedeUnilevel from '@/components/RedeUnilevel'
import RedeDireta from '@/components/MeusDiretos'
import Cadastro from '@/components/Cadastro'
import MeusDados from '@/components/MeusDados'
import Arquivos from '@/components/Arquivos'
import NewPlayAcc from '@/components/NewPlayAcc'
import UpdPlayAcc from '@/components/UpdPlayAcc'
import NovaProposta from '@/components/Contratos'
import VerPropostas from '@/components/Propostas'
import Catalogo from '@/components/Catalogo'
import MyPlayAccs from '@/components/MyPlayAccounts'
import Player from '@/components/Player'
import Market from '@/components/Market'
import Market_PA from '@/components/Market_PA'
import MySales from '@/components/MySales'

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
      path: '/marketplace',
      name: 'Market',
      component: Market
    },
    {
      path: '/marketplace/pa/:idpa',
      name: 'MarketPA',
      component: Market_PA
    },
    {
      path: '/mysales',
      name: 'mysales',
      component: MySales
    },
    {
      path: '/player/:idp',
      name: 'Player',
      component: Player
    },
    {
      path: '/fazerproposta/:idp',
      name: 'NovaProposta',
      component: NovaProposta
    },
    {
      path: '/play-accounts',
      name: 'myplayaccounts',
      component: MyPlayAccs
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
      name: 'Catalogo',
      component: Catalogo
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