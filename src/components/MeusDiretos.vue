<template>
    <div class="content1">
      <h4>Meus indicados diretos | Total: {{rd.length}} cadastros diretos.</h4>
            <div class="diretos">

              <table cellspacing='0px'>
                <tr>
                  <th>ID</th>
                  <th>NOME [codename]</th>
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
                  <td>{{UTILS.formatData(v.udata) }}</td>
                </tr>
              </table>
                <h4>(*) T.EQ. = Total da Equipe</h4>
            </div>
    </div>
</template>

<script>
import REDEDIRETA from '../services/dataRede'
import UTILS from '@/utils/utils'
export default {
  data(){
    return {
      rd: [],
      listaError: false,
      UTILS
    }
  },
  methods:{
    buscaRedeDireta(){
      REDEDIRETA.buscaMeusIndicadosDiretos()
      .then(r => {
        return this.rd = r.data.ss
      })
      .catch(err => {
        return this.listaError = err
      })
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