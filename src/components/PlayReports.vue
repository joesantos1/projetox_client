<template>
  <div>
          <div>
              <h3>(+) Novo registro de metas e resultado [new play reports]:</h3>
          <form @submit.prevent="novoPR" v-if="!owner">
              <table class="tb1">
                <tr>
                  <th>Resultado [points] (*)</th>
                  <td><input type="text" name="points" v-model="fpr.points"></td>
              </tr>
              <tr>
                  <th>Data (*)</th>
                  <td><input type="text" name="data" v-model="fpr.play_data"></td>
              </tr>
              <tr>
                  <th>Comentários (max.: 1000 caract.)</th>
                  <td><textarea v-model="fpr.comments" name="comments" id="comments" cols="50" rows="4"></textarea></td>
              </tr>
              <tr>
                  <td></td>
                  <td><button type="submit">SALVAR</button></td>
              </tr>
              </table>
              <i>(*) Campos obrigatórios.</i>
          </form>
          </div>
          <h3>Últimos registros de metas e resultados [play reports] | {{qtd}} registros encontrados</h3>
          <table class="tb1">
              <tr>
                  <th>[#ID]</th>
                  <th>Registrado em</th>
                  <th>Atualizado em</th>
                  <th>Player [codename]</th>
                  <th>Meta [points]</th>
                  <th>Report [points]</th>
                  <th>Comentários</th>
                  <th>Status</th>
                  <td v-if="owner"></td>
              </tr>
              <tr v-for="v of dpr" :key="v.id">
                  <td>#0x{{idagree}}</td>
                  <td>{{UTILS.formatData(v.createdAt)}}</td>
                  <td>{{UTILS.formatData(v.updatedAt)}}</td>
                  <td>{{v.player_name}}</td>
                  <td>{{v.meta_points}}</td>
                  <td>{{v.points}}</td>
                  <td>{{v.comments}}</td>
                  <td>{{UTILS.vStatusPlayReports(v.status)}}</td>
                  <td v-if="owner"><button v-if="v.status==1" @click="verificaPR(v.idplay_reports)">Verificar</button></td>
              </tr>
          </table>
  </div>
</template>

<script>
import UTILS from '@/utils/utils'
import PLAYREPORTS from '../services/playreports'
export default {
    props: ['owner','idagree'],
    data(){
        return {
            fpr: {
                idagreements: this.idagree,
                comments: null,
                points: null,
                play_data:null
            },
            dpr: [],
            qtd: 0,
            UTILS
        }
    },
    methods: {
        buscaTodosPR(){
            PLAYREPORTS.buscaTodosPlayReports(this.idagree)
            .then(r => {
               
                this.dpr = r.data.rr
                return this.qtd = r.data.qtd
            })
            .catch(err => {
                return alert('Algo deu errado.')
            })
        },
        novoPR(){
            if(this.fpr.points == null && this.fpr.data == null){
                return alert('Por favor, preencha todos os campos obrigatórios.')
            }
            PLAYREPORTS.novoPlayReport(this.fpr)
            .then(r => {
                alert('Registro salvo com sucesso.')
                return this.$router.go()
            })
            .catch(err => {
                return alert('Algo deu errado aqui.')
            })
        },
        verificaPR(idpr){
            var dados = {idpr, idag: this.idagree}
            PLAYREPORTS.atualizaPlayReport(dados)
            .then(r => {
                alert('Report verificado.')
                return this.$router.go()
            })
            .catch(err => {
                return alert('Algo deu errado.')
            })
        }
    },
    mounted(){
        return this.buscaTodosPR()
    }
}
</script>

<style>

</style>