<template>
  <div class="my_play_accounts">
        <h3>My Play-Accounts | {{mpa.tt}} contas registradas.</h3>
        <table cellspacing="0px" class="tb1">
          <tr>
            <th>Account</th>
            <th>Game</th>
            <th>Status</th>
            <th>Player</th>
            <th>Meta</th>
            <th>PRR(%)</th>
            <th>ARR</th>
            <td></td>
          </tr>
          <tr v-for="v of mpa.rr" :key="v.id">
              <td>{{v.titulo}}</td>
              <td align="center">{{v.game_nome}}</td>
              <td align="center">{{statusPlayAcc(v.status)}}</td>
              <td align="center">{{v.player_nome}}</td>
              <td align="center">{{v.meta_points}}</td>
              <td align="center">{{v.deal}}</td>
              <td align="center"></td>
              <td><router-link :to="'/upd-play-acc/'+v.idplay_accounts">Config</router-link></td>
          </tr>
        </table>
        <p>(*1) PRR -> Participação nos Resultados e Recompensas</p>
        <p>(*2) ARR -> Acumulado de Resultados e Recompensas</p>
        <h4><router-link to="/new-play-account"> + Cadastrar nova conta</router-link></h4>
      </div>
</template>

<script>
import MYPLAYACC from '../services/playacc'
export default {
    data(){
        return {
            mpa: []
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
        statusPlayAcc(s){
            if(s==1){
                return 'Playing'
            }
            if(s==2){
                return 'Aguardando Jogador'
            }
        }
    },
    mounted(){
        return this.buscaMPAs()
    }
}
</script>

<style>

</style>