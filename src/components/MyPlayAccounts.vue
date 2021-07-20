<template>
  <div :class="dashview ? '': 'content1'">
        <h3><span v-if="!dashview"><router-link to="/">Dashboard</router-link> | </span> My Play-Accounts | {{mpa.tt}} contas registradas.</h3>
        <table cellspacing="0px" class="tb1">
          <tr>
            <th>Account</th>
            <th>Game</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Player</th>
            <th>Total Points</th>
            <th>Update at:</th>
            <td></td>
          </tr>
          <tr v-for="v of mpa.rr" :key="v.id">
              <td>{{v.titulo}}</td>
              <td align="center">{{v.game_nome}}</td>
              <td align="center"><span v-html="UTILS.vStatusPlayAcc(v.status)"></span></td>
              <td>{{v.owner_name}}</td>
              <td align="center">{{v.player_nome}}</td>
              <td align="center">{{v.total_points}}</td>
              <td align="center">{{UTILS.formatData(v.last_report)}}</td>
              <td><router-link :to="'/play-account/'+v.idplay_accounts +'/'+v.idagreements">Acessar</router-link></td>
          </tr>
        </table>
        <h4><router-link to="/new-play-account"> + Cadastrar nova conta</router-link></h4>
        <PLAYREPORTS owner="" idagree="" v-if="!dashview" />
      </div>
</template>

<script>
import MYPLAYACC from '../services/playacc'
import PLAYREPORTS from '@/components/PlayReports.vue'
import UTILS from '@/utils/utils'
export default {
    props: ['dashview'],
    data(){
        return {
            mpa: [],
            UTILS,
            PLAYREPORTS
        }
    },
    methods: {
        buscaMPAs(){
            MYPLAYACC.buscaTodasPlayAcc()
            .then(r => {
                return this.mpa = r.data
            })
            .catch(err => {
                return alert(err)
            })
        },
        
    },
    mounted(){
        return this.buscaMPAs()
    }
}
</script>

<style>

</style>