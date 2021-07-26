<template>
  <div :class="view==0 ? '' : 'content1'">
      <h3><router-link to="/">Dashboard</router-link> | My Sales | {{qtd}} pedidos. | Total vendas: U$ {{totalvendas}}</h3>
        <table class="tb1">
            <tr>
                <th>#ID</th>
                <th>#ID Play-Account</th>
                <th>#ID Buyer</th>
                <th>TOTAL [quotas]</th>
                <th>PEDIDO [qtd]</th>
                <th>Price</th>
                <th>TOTAL [U$]</th>
                <th>STATUS</th>
                <th>Pedido em</th>
                <td></td>
            </tr>
            <tr v-for="v of mv" :key="v.id">
                <td>#{{v.idquotas_distrib}}</td>
                <td><router-link :to="'/play-account/' + v.idplay_accounts + '/'">{{v.titulo}} #{{v.idplay_accounts}}</router-link> </td>
                <td>{{v.buyer_name}} #{{v.idbuyer}}</td>
                <td>{{v.quota_total}}</td>
                <td>{{v.qtd}}</td>
                <td>U$ {{v.price}}</td>
                <td>U$ {{v.price * v.qtd}}</td>
                <td>{{v.status}}</td>
                <td>{{UTILS.formatData(v.createdAt)}}</td>
                <td>
                    <button v-if="v.status!=3" @click="confirmaPagto(v.idquotas_distrib, v.idplay_accounts, v.quota_total)">CONFIRMA PAGAMENTO</button>
                    <span v-else>Pagamento confirmado.</span>
                </td>
            </tr>
        </table>
        <div class="errors" v-if="ERROR" @click="ERROR=false">{{ERROR}}</div>
  </div>
</template>

<script>
import MARKETVENDAS from '../services/market'
import UTILS from '@/utils/utils'

export default {
    props: ['idpacc', 'view'],
    data(){
        return {
            qtd: 0,
            mv: [],
            UTILS,
            totalvendas: 0,
            ERROR: false
        }
    },
    methods: {
        buscaVendas(){
            let idpa = 0
            this.idpacc ? idpa = this.idpacc : idpa 

            MARKETVENDAS.buscaTodasMinhasVendas(idpa)
            .then(r => {

                var rr = r.data.rr
                let calc = 0

                for(var x in rr){
                    if(rr[x].status==3){
                        calc = rr[x].qtd * rr[x].price
                        this.totalvendas += calc
                    }
                    
                }
                this.qtd = r.data.qtd
                return this.mv = rr
            })
            .catch(err => { return this.ERROR = err.response.data.error })
        },
        confirmaPagto(id, idpa, total){
            var dados = {
                idOrder: id, 
                idpa,
                total
                }
            MARKETVENDAS.confirmaPagamentoVenda(dados)
            .then(r=> {
                alert('Pagamento confirmado.')
                return this.$router.go()
            })
            .catch(err => { return this.ERROR = err.response.data.error })
        }
    },
    created(){
        return this.buscaVendas();
    }
}
</script>

<style>

</style>