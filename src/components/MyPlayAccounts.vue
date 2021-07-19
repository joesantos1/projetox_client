<template>
  <div class="my_play_accounts">
        <h3>My Play-Accounts | {{mpa.tt}} contas registradas.</h3>
        <table cellspacing="0px" class="tb1">
          <tr>
            <th>Account</th>
            <th>Game</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Player</th>
            <th>Meta</th>
            <th>Meta [record]</th>
            <th>ARR</th>
            <td></td>
          </tr>
          <tr v-for="v of mpa.rr" :key="v.id">
              <td>{{v.titulo}}</td>
              <td align="center">{{v.game_nome}}</td>
              <td align="center">{{UTILS.vStatusPlayAcc(v.status)}}</td>
              <td>{{v.owner_name}}</td>
              <td align="center">{{v.player_nome}}</td>
              <td align="center">{{v.meta_points}}</td>
              <td align="center">{{UTILS.vMetaRecord(v.meta_record)}}</td>
              <td align="center"></td>
              <td><router-link :to="'/play-account/'+v.idplay_accounts +'/'+v.idagreements">Acessar</router-link></td>
          </tr>
        </table>
        <p>(*2) ARR -> Acumulado de Resultados e Recompensas</p>
        <h4><router-link to="/new-play-account"> + Cadastrar nova conta</router-link></h4>
      </div>
</template>

<script>
import MYPLAYACC from '../services/playacc'
import UTILS from '@/utils/utils'
export default {
    data(){
        return {
            mpa: [],
            UTILS
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