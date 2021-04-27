<template>
  <div class="content-user">
      <div class="content1">
            <div class="rede-unilevel">
                    <h4>Minha rede unilevel | Total de Cadastros: {{tRC}} | Buscar: <input type="text" size="20" v-model="busca" @keyup="buscaRedeUnilevel" > <button @click="buscaRedeUnilevel">Buscar</button></h4>
                        <table cellspacing="0px">
                            <tr>
                                <th>NOME</th>
                                <th>N</th>
                                <th>UPLINES</th>
                                <th>R.D.</th>
                                <th>STATUS</th>
                                <th>ADD EM:</th>
                            </tr>
                            <tr v-for="v of ru" :key="v.id">
                                <td>{{v.unome}}</td>
                                <td align="center">#{{v.nivel}}</td>
                                <td>{{v.myups}}</td>
                                <td align="center">{{v.utd == 0 || v.utd == undefined ? '-' : v.utd}}</td>
                                <td align="center">{{v.ustatus == 1 ? 'ATIVO' : 'INATIVO'}}</td>
                                <td align="center">{{formatData(v.udata) }}</td>
                            </tr>

                        </table>
                        <h4>(*) R.D. = Rede Direta <br>(*) N = Nivel | {{rb}}</h4>
                       
                </div>
      </div>
      
  </div>
</template>

<script>
import REDE_UNILEVEL from '../services/dataRede'

export default {
    data(){
        return {
            ru: [],
            rb: [],
            tRC: null,
            listaError: false,
            busca: null
        }
    },
    methods:{
        formatData(data){

            var d = data.split('T')
            var d1 = d[0].split('-')

            var h1 = d[1].split(':')

            var ha = h1[0] >= 3 ? h1[0] - 3 : parseInt(h1[0]) + 24 - 3

            var hh = ha < 10 ? '0' + ha : ha

            var r = d1[2] + '/' + d1[1] + '/' + '2021' + ' às ' + hh + 'h' + h1[1]

            return r;
        },
        buscaRedeUnilevel(){

            var r = []
            
                for(var v in this.ru){
                    var un = this.ru[v].unome.toLowerCase()
                    r[v] = un.indexOf(this.busca.toLowerCase())

                    if(r[v]==0){
                        return this.rb = this.ru[v]
                    }
                } 
            
            
        
        }
    },
    mounted(){
        REDE_UNILEVEL.buscaMinhaRedeUnilevel()
        .then(r => {
            this.tRC = r.data.tRC
            return this.ru = r.data.RC

        })
        .catch(err => {
            return alert(err)
        })
    }

}
</script>

<style>
.rede-unilevel table th{
    background-color: rgb(44, 44, 44);
    color: white;
    text-align: center;
}
.rede-unilevel table td{
    border: 1px solid grey;
}
.rede-unilevel table tr:hover{
    background-color: rgb(219, 219, 219);
}
.rede-unilevel table{
    border-collapse: collapse;
}
.rede-unilevel a{
    cursor: pointer;
}
</style>