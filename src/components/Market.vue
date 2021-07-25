<template>
  <div class="content1">
      <h3><router-link to="/">Dashboard</router-link> | Marketplace</h3>
      <ul v-for="v of pas" :key="v.id">
          <li>Game: {{v.game_name}}</li>
          <li>U$ {{v.quota_price}}</li>
          <li>Total: {{v.quota_total}} cotas</li>
          <li>T. Vendidas: {{v.total_venda}}</li>
          <li>Share: {{v.quota_share}}%</li>
          <li>Mananger: {{v.manager_name}}</li>
          <li>Registrada em: {{UTILS.formatData(v.createdAt) }}</li>
          <li><router-link :to="'/marketplace/pa/'+v.idpa">COMPRAR</router-link> </li>
      </ul>
  </div>
</template>

<script>
import MARKET from '../services/market'
import UTILS from '@/utils/utils'
export default {
    data(){
        return {
            pas: [],
            UTILS
        }
    },
    methods: {
        buscaTodasPAs(){
            MARKET.buscaTodasPAsQuotas()
            .then(r => {
                return this.pas = r.data.rr
            })
            .catch(err => {
                return console.log(err);
            })
        }
    },
    created(){
        return this.buscaTodasPAs()
    }
}
</script>

<style>

</style>