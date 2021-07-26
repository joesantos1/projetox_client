<template>
  <div class="content1">
      <h3><router-link to="/">Dashboard</router-link> | Meus pedidos [orders] | {{qtd}} pedidos encontrados.</h3>
      <table class="tb1">
          <tr>
              <th>Realizado em</th>
              <th>Play-account #ID</th>
              <th>Game</th>
              <th>Vendedor</th>
              <th>Pedido [qtd]</th>
              <th>Price [01 unit]</th>
              <th>Total [U$]</th>
              <th>STATUS</th>
              <td></td>
          </tr>
          <tr v-for="v of mp" :key="v.id">
              <td>{{UTILS.formatData(v.createdAt)}}</td>
              <td>{{v.titulo}} #{{v.idplay_accounts}}</td>
              <td>{{v.name_game}}</td>
              <td>{{v.name_seller}}</td>
              <td>{{v.qtd}}</td>
              <td>U$ {{v.price}}</td>
              <td>U$ {{v.price * v.qtd}}</td>
              <td v-html="UTILS.vStatusOrders(v.status)"></td>
              <td><router-link :to="'/marketplace/pa/' + v.idplay_accounts">Ver detalhes</router-link></td>
          </tr>
      </table>
  </div>
</template>

<script>
import MARKET from '../services/market'
import UTILS from '@/utils/utils'
export default {
    data(){
        return {
            UTILS,
            mp: [],
            qtd: 0
        }
    },
    methods: {
        buscaTodosPedidos(){
            MARKET.buscaTodosMeusPedidos()
            .then(r => {
                this.qtd = r.data.qtd
                return this.mp = r.data.rr
            })
            .catch(err => {
                return
            })
        }
    },
    created(){
        return this.buscaTodosPedidos()
    }

}
</script>

<style>

</style>