<template>
  <div class="coin-market">
      <h3>Últimos Preços e variações(%)(24h): </h3>
      <ul v-for="(v,key) in coin" :key="v.id">
          <li> <b>{{UTILS.vCoin(key)}}</b></li>
          <li>U$ {{new Intl.NumberFormat('pt-BR').format(v.usd) }} <span v-html="UTILS.vCoinLastChange(v.usd_24h_change) "></span></li>
          <li>R$ {{new Intl.NumberFormat('pt-BR').format(v.brl)}} <span v-html="UTILS.vCoinLastChange(v.brl_24h_change) "></span></li>
      </ul>
  </div>
</template>

<script>
import COINS from '../services/coingecko'
import UTILS from '@/utils/utils'
export default {
    data(){
        return{
            coin: [],
            UTILS
        }
    },
    methods: {
        buscaCoins(){
            COINS.buscaCoinPrice()
            .then(r => {
                return this.coin = r.data
            })
            .catch(err => { return alert(err)})
        }
    },
    mounted(){
        return this.buscaCoins()
    }
}
</script>

<style>
.coin-market{
    float: left;
    width: 100%;
    border-radius: 10px;
    background: rgb(236, 236, 236);
    align-items: center;
}
.coin-market ul{
    padding: 1px 10px;
    margin: 5px 10px;
    list-style: none;
    float: left;
    background: white;
    border-radius: 10px;
}
</style>