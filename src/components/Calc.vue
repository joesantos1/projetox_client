<template>
  <div class="content1">
      <h2><router-link to="/">Dashboard</router-link> | Calculadora [Simulações]</h2>
      <COINMARKETS dashview="0" />

  </div>
</template>

<script>
import COINMARKETS from '@/components/CoinMarkets.vue'
export default {
  components:{
    COINMARKETS
  }

}
</script>

<style>

</style>