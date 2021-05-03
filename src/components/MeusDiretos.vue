<template>
  <div class="content-u">
    <div class="content1">
      <h4>Meus indicados diretos | Total: {{rd.length}} cadastros diretos.</h4>
            <div class="diretos">

              <table cellspacing='0px'>
                <tr>
                  <th>ID</th>
                  <th>NOME</th>
                  <th>NICK</th>
                  <th>EMAIL</th>
                  <th>TEL</th>
                  <th>STATUS</th>
                  <th>T. REDE</th>
                  <th>Cadastrado em:</th>
                </tr>
                <tr v-for="v of rd" :key="v.id">
                  <td>{{v.uid}}</td>
                  <td>{{v.unome}}</td>
                  <td>{{v.unick}}</td>
                  <td>{{v.uemail}}</td>
                  <td>{{v.utel1}}</td>
                  <td align="center">{{v.ustatus == 1 ? 'ATIVO' : 'INATIVO'}}</td>
                  <td align="center">{{v.rt}}</td>
                  <td>{{formatData(v.udata) }}</td>
                </tr>
              </table>
                <h4>(*) T.EQ. = Total da Equipe</h4>
            </div>
    </div>
      
  </div>
</template>

<script>
import REDEDIRETA from '../services/dataRede'
export default {
  data(){
    return {
      rd: [],
      listaError: false
    }
  },
  methods:{
    buscaRedeDireta(){
      REDEDIRETA.buscaMeusIndicadosDiretos()
      .then(r => {
        this.rd = r.data.ss
      })
      .catch(err => {
        return this.listaError = err
      })
    },
    formatData(data){

            var d = data.split('T')
            var d1 = d[0].split('-')

            var h1 = d[1].split(':')

            var ha = h1[0] >= 3 ? h1[0] - 3 : parseInt(h1[0]) + 24 - 3

            var hh = ha < 10 ? '0' + ha : ha

            var r = d1[2] + '/' + d1[1] + '/' + '2021' + ' às ' + hh + 'h' + h1[1]

            return r;
        }
  },
  mounted(){
    this.buscaRedeDireta()
  }
}
</script>

<style>
.diretos table{
  border-collapse: collapse;
}
.diretos table td,.diretos th{
  border: 1px solid grey;
}
.diretos th{
  background-color: rgb(48, 48, 48);
  color: white;
}

</style>