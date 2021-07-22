<template>
  <div class="content1">
      <h3><router-link to="/">Dashboard</router-link>  | Reports Player: {{dpr[0].player_name}}</h3>
      <table class="tb1">
          <tr>
              <th>PAÍS</th>
              <td>{{dpr[0].pais}}</td>
          </tr>
          <tr>
              <th>ABOUT ME [apresentation]</th>
              <td>{{dpr[0].about}}</td>
          </tr>
          <tr>
              <th>GAMES [exp]</th>
              <td>{{UTILS.verGames(dpr[0].games)}}</td>
          </tr>
          <tr>
              <th>POINTS [total]</th>
              <td>{{dpr[0].total_points}}</td>
          </tr>
          <tr>
              <th>RATING</th>
              <td>{{dpr[0].rating}}</td>
          </tr>
      </table>
    <h3>Últimos registros de metas e resultados [play reports] | {{qtd}} registros encontrados</h3>
    <table class="tb1" v-if="qtd > 0">
        <tr>
            <th>#ID</th>
            <th>Registrado em</th>
            <th>Atualizado em</th>
            <th>Game</th>
            <th>Meta [points]</th>
            <th>Report [points]</th>
            <th>Comentários</th>
            <th>Status</th>
        </tr>
        <tr v-for="v of dpr" :key="v.id">
            <td>#000{{v.idplay_reports}}</td>
            <td>{{UTILS.formatData(v.createdAt)}}</td>
            <td>{{UTILS.formatData(v.updatedAt)}}</td>
            <td>{{v.game_name}}</td>
            <td>{{v.meta_points}}</td>
            <td>{{v.points}}</td>
            <td>{{v.comments}}</td>
            <td>{{UTILS.vStatusPlayReports(v.status)}}</td>
        </tr>
    </table>
  </div>
</template>

<script>
import UTILS from '@/utils/utils'
import PLAYREPORTS from '../services/playreports'
export default {
    data(){
        return {
            dpr: [{}],
            qtd: 0,
            UTILS
        }
    },
    methods: {
        buscaTodosPR(){
            PLAYREPORTS.buscaTodosPlayReportsPlayer(this.$route.params.idp)
            .then(r => {
               
                this.dpr = r.data.rr
                return this.qtd = r.data.qtd
            })
            .catch(err => {
                return alert('Algo deu errado.')
            })
        }
    },
    created(){
        return this.buscaTodosPR()
    }
}
</script>

<style>

</style>