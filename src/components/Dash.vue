<template>
    <div class="content1">
      <span class="acordos"><h3>Você possui {{nprops}} propostas e acordos. <span v-if="nprops>0"><router-link to="/propostas">Acessar</router-link></span> </h3></span>
      
      <COINMARKETS />
      <MYPLAYACCOUNTS dashview="true" />
      <CATALOGO dashview="true" />
    </div>
</template>

<script>
import MYPLAYACCOUNTS from '@/components/MyPlayAccounts.vue'
import CATALOGO from '@/components/Catalogo.vue'
import PROPOSTAS from '../services/agreements'
import COINMARKETS from '@/components/CoinMarkets.vue'

export default {
  components:{
    MYPLAYACCOUNTS,
    CATALOGO,
    COINMARKETS
  },
  data(){
    return {
      nprops: 0
    }
  },
  methods: {
    buscaPropostas(){
      PROPOSTAS.buscaPropostasEAcordos(1)
      .then(r => {
        return this.nprops = r.data.nprops
      })
      .catch(err => {
        return this.nprops = 0
      })
    }
  },
  mounted(){
    return this.buscaPropostas()
  }
}
</script>

<style>
.acordos{
  background-color: rgb(121, 136, 158);
  float: left;
  color: white;
  width: 100%;
  border-radius: 20px;
  margin-bottom: 20px;
}
.acordos h3{
  margin: 10px;
}
.acordos a, .acordos a:visited, .acordos a:active{
  color: yellow;
}

</style>