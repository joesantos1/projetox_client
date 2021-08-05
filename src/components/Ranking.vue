<template>
  <div class="ranking">
      <h3>Ranking Players</h3>
      <table class="tb1">
          <tr>
              <th>Pº</th>
              <th>PLAYER</th>
              <th>T. POINTS</th>
          </tr>
          <tr v-for="(v, index) in ra" :key="v.id">
              <td align="center">{{index+1}}</td>
              <td>
                  <span class="player-parent"> 
                        <span class="foto-user-list" v-if="v.foto_url" v-bind:style="{ backgroundImage: UTILS.url(v.foto_url) }"></span> <span class="foto-user-list no-foto" v-else ></span>
                        <span><router-link :to="'/player/'+v.idusuarios">{{v.nome}} #{{v.idusuarios}}</router-link> </span>
                        
                    </span>
              </td>
              <td align="center">{{v.points_rank > 0  ? v.points_rank : 0}}</td>
          </tr>
      </table>
  </div>
</template>

<script>
import RANKING from '../services/dataUser'
import UTILS from '@/utils/utils.js'

export default {
    data(){
        return{
            ra: [],
            UTILS
        }
    },
    methods:{
        geraRanking(){
            RANKING.novoRanking()
            .then(r => {
                return this.ra = r.data.rr
            })
            .catch(err => {
                return console.log(err);
            })
        }
    }
    ,
    mounted(){
        return this.geraRanking()
    }
}
</script>

<style>

</style>