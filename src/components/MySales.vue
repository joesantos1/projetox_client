<template>
  <div class="content1">
      <h3><router-link to="/">Dashboard</router-link> | My Sales | {{qtd}} pedidos.</h3>
        <table class="tb1">
            <tr>
                <th>#ID</th>
                <th>#ID Play-Account</th>
                <th>#ID Buyer</th>
                <th>Price</th>
                <th>QTD</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>Pedido em</th>
            </tr>
            <tr v-for="v of mv" :key="v.id">
                <td>#{{v.idquotas_distrib}}</td>
                <td><router-link :to="'/play-account/' + v.idplay_accounts + '/'">#{{v.idplay_accounts}} - {{v.titulo}}</router-link> </td>
                <td>{{v.buyer_name}} #{{v.idbuyer}}</td>
                <td>U$ {{v.price}}</td>
                <td>{{v.qtd}}</td>
                <td>U$ {{v.price * v.qtd}}</td>
                <td>{{v.status}}</td>
                <td>{{v.createdAt}}</td>
            </tr>
        </table>
  </div>
</template>

<script>
import MARKETVENDAS from '../services/market'
import UTILS from '@/utils/utils'

export default {
    data(){
        return {
            qtd: 0,
            mv: []
        }
    },
    methods: {
        buscaVendas(){
            MARKETVENDAS.buscaTodasMinhasVendas()
            .then(r => {
                this.qtd = r.data.qtd
                return this.mv = r.data.rr
            })
            .catch(err => {
                return alert(err)
            })     
        }
    },
    created(){
        return this.buscaVendas();
    }
}
</script>

<style>

</style>