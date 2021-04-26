<template>
  <div class="content-user">
      <div class="content1">
            <div class="rede-unilevel">
                    <h4>Minha rede unilevel | Total de Cadastros: {{tRC}}</h4>
                        <table cellspacing="0px">
                            <tr>
                                <th>NIVEL</th>
                                <th>NOME</th>
                                <th>T. CADASTROS</th>
                                <th>STATUS</th>
                                <th>ADD EM:</th>
                                <th></th>
                            </tr>
                            <tr v-for="v of ru.nivel1" :key="v.id">
                                <td align="center">#{{v.nivel}}</td>
                                <td>
                                    <a v-if="v.uredetotal > 0" @click="verNivelAbaixo(v.uid,0)">{{v.unome}}</a>
                                    <span v-if="v.uredetotal==undefined || v.uredetotal==0">{{v.unome}}</span>
                                </td>
                                <td align="center">{{v.uredetotal == 0 || v.uredetotal == undefined ? '-' : v.uredetotal}}</td>
                                <td align="center">{{v.ustatus == 1 ? 'ATIVO' : 'INATIVO'}}</td>
                                <td align="center">{{formatData(v.udata) }}</td>
                                <td align="center">[+]</td>
                            </tr>

                        </table>
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
            tRC: null,
            listaError: false
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
        verNivelAbaixo(uid,nivel){


        }
    },
    mounted(){
        REDE_UNILEVEL.buscaMinhaRedeUnilevel()
        .then(r => {
            this.tRC = r.data.tRC
            return this.ru = r.data.RCO

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
.rede-unilevel table{
    border-collapse: collapse;
}
.rede-unilevel a{
    cursor: pointer;
}
</style>