<template>
  <div class="content1">
      <h3><router-link to="/">Dashboard</router-link> | <router-link to="/marketplace">Marketplace</router-link> | Play-Account #{{this.$route.params.idpa}}</h3>
      <table class="tb2">
          <tr>
              <th colspan="2">PLAY-ACCOUNT INFOR</th>
          </tr>
          <tr>
              <th>
                  Play-Account #ID
              </th>
              <td>#{{pa.idpa}}</td>
          </tr>
          <tr>
              <th>GAME [name]</th>
              <td>{{pa.game_name}}</td>
          </tr>
          <tr>
              <th>P.A. STATUS</th>
              <td>{{UTILS.vStatusPlayAccMarket(pa.status_pa)}}</td>
          </tr>
          <tr>
              <th>P.A. INFOR.</th>
              <td>{{pa.infor}}</td>
          </tr>
          <tr>
              <th>P.A. MANAGER</th>
              <td>{{pa.manager_name}}</td>
          </tr>
          <tr>
              <th>P.A. BLOCKCHAIN SMART CONTRACT</th>
              <td><a :href="pa.contract_address" target="_blank">Acessar contrato</a> </td>
          </tr>
          <tr>
              <th colspan="2">CONTRATO PLAYER INFOR</th>
          </tr>
          <tr>
              <th>PLAYER [codename] #ID</th>
              <td><router-link :to="'/player/'+pa.idplayer">#00{{pa.idplayer}} {{pa.player_name}}</router-link> </td>
          </tr>
          <tr>
              <th>TERMOS [contrato_player]</th>
              <td>{{pa.termos}}</td>
          </tr>
          <tr>
              <th>STATUS [contrato]</th>
              <td>{{pa.status_agree}}</td>
          </tr>
          <tr>
              <th>META [points]</th>
              <td>{{pa.meta_points}}</td>
          </tr>
          <tr>
              <th>META [record]</th>
              <td>{{UTILS.vMetaRecord(pa.meta_record)}}</td>
          </tr>
          <tr>
              <th>CONTRATO [data]</th>
              <td>{{UTILS.formatData(pa.data_contrato)}}</td>
          </tr>
          <tr>
              <th colspan="2">QUOTA SYSTEM INFOR</th>
          </tr>
          <tr>
              <th>QUOTAS [share %]</th>
              <td>{{pa.quota_share}}</td>
          </tr>
          <tr>
              <th>QUOTAS TOTAL</th>
              <td>{{pa.quota_total}}</td>
          </tr>
          <tr>
              <th>QUOTAS [sold]</th>
              <td>{{pa.total_venda}}</td>
          </tr>
          <tr>
              <th>QUOTAS [price] 01 unit</th>
              <td>U$ {{pa.quota_price}}</td>
          </tr>
          <tr>
              <th>BUY AMOUNT [quotas]</th>
              <td><input type="text" name="order" @keyup="calculaValor(v)" v-model="order"><span @click="calculaValor(pa.quota_total)"> :Max</span> <br> Total: U$ {{vt}}</td>
          </tr>
          <tr>
              <th>PAYMENT METHOD</th>
              <td>{{UTILS.verQuotaCurrency(pa.quota_currency)}}</td>
          </tr>
          <tr>
              <td></td>
              <td><button @click="orderBuy()">COMPRAR</button></td>
          </tr>
      </table>
  </div>
</template>

<script>
import MARKETPA from '../services/market'
import UTILS from '@/utils/utils'
export default {
    data(){
        return {
            pa: [{}],
            UTILS,
            order: 0,
            vt: 0
        }
    },
    methods: {
        buscaDadosPA(){
            MARKETPA.buscaDadosPAcompra(this.$route.params.idpa)
            .then(r => {
                return this.pa = r.data.rr[0]
            })
            .catch(err => {
                return console.log(err);
            })
        },
        calculaValor(v){
            if(this.order > this.pa.quota_total) return this.vt = 'Quantidade não disponível.'
            if(v){
                this.order = v
                return this.vt = (this.pa.quota_price * v)
            } 
            let num = parseFloat(this.order)
            let tot = parseInt(this.pa.quota_price)
            return this.vt = (num * tot) 
        },
        orderBuy(){

            if(this.order > this.pa.quota_total) return alert('Quantidade maior do que estoque disponível.')

            var dados = {
                idpa: this.$route.params.idpa,
                amount: this.order,
                total: this.pa.quota_total,
                price: this.pa.quota_price,
                seller: this.pa.idmanager
            }
            MARKETPA.verificaOrderBuyPA(dados)
            .then(r => {
                return alert('Compra realizada com sucesso.')
            })
            .catch(err => {
                return alert(err)
            })
        }
    },
    created(){
        return this.buscaDadosPA()
    }
}
</script>

<style>

</style>