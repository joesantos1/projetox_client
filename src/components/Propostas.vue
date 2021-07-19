<template>
  <div class="content-u">
      <div class="content1">
<h3><router-link to="/">Dashboard</router-link> | Propostas e Acordos | {{qtd}} registros encontrados.</h3>
        <table class="tb1" v-for="v of fpa" :key="v.id">
            <tr v-if="v.status!=1">
                <th colspan="2">{{UTILS.vStatusAgreement(v.status)}}</th>
            </tr>
            <tr>
                <th>ACORDO (#ID)</th>
                <td>#000{{v.idagreements}}</td>
            </tr>
              <tr>
                  <th>ENVIADA POR</th>
                  <td>{{v.owner_name}}</td>
              </tr>
              <tr>
                  <th>GAME</th>
                  <td>{{v.game_name}}</td>
              </tr>
              <tr>
                  <th>TERMOS</th>
                  <td>{{v.termos}}</td>
              </tr>
              <tr>
                  <th>META [points]</th>
                  <td>{{v.meta_points}}</td>
              </tr>
              <tr>
                  <th>META [record]</th>
                  <td>{{UTILS.vMetaRecord(v.meta_record)}}</td>
              </tr>
              <tr>
                  <th>(%) SHARE</th>
                  <td>{{v.share}}</td>
              </tr>
              <tr>
                  <th>Método de Pagamento</th>
                  <td>{{UTILS.vPaymentType(v.payment_type)}}</td>
              </tr>
              <tr>
                  <th>Enviado em</th>
                  <td>{{UTILS.formatData(v.createdAt) }}</td>
              </tr>
              <tr v-if="v.status==2 || v.status==3">
                  <th>Proposta respondida em</th>
                  <td>{{UTILS.formatData(v.updatedAt)}}</td>
              </tr>
              <tr v-if="v.status==1">
                  <td></td>
                  <td>
                      <button @click="aceitaProposta(v.idagreements,3,v.idplay_acc)">ACEITAR PROPOSTA</button> 
                      <button>FAZER CONTRA-PROPOSTA</button> 
                      <button @click="aceitaProposta(v.idagreements,2,v.idplay_acc)">RECURSAR</button></td>
              </tr>
          </table>
      </div>
      
  </div>
</template>

<script>
import UTILS from '@/utils/utils'
import PROPOSTAS from '../services/agreements'

export default {
    data(){
        return {
            fpa: [],
            UTILS,
            qtd: 0
        }
    },
    methods: {
        buscaTodasPropostas(){
            PROPOSTAS.buscaPropostasEAcordos(2)
            .then(r => {
                this.qtd = r.data.busca.length
                return this.fpa = r.data.busca
            })
            .catch(err => {
                return alert('Algo deu errado. Por favor, tente mais tarde.')
            })
        },
        aceitaProposta(idp,v,idpa){

            var da = {idp,tipo: v, idpa}

            if(v==1){
               PROPOSTAS.enviaAceiteProposta(da)
                .then(r => {
                    return this.$router.go()
                })
                .catch(err => {
                    return alert('erro aqui.')
                }) 
            }else{
                PROPOSTAS.enviaAceiteProposta(da)
                .then(r => {
                    return this.$router.go()
                })
                .catch(err => {
                    return alert('erro agora aqui')
                })
            }
            
        }
    },
    mounted(){
        return this.buscaTodasPropostas()
    }
}
</script>

<style>

</style>