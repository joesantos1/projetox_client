<template>
  <div>
        <div v-if="!owner && dprStatus != 4">
            <h3>(+) Novo registro de metas e resultado [new play reports]:</h3>
        <form @submit.prevent="novoPR" >
            <table class="tb1">
            <tr>
                <th>TOTAL [points] (*)</th>
                <td>
                    <input type="text" name="points" v-model="points" @keyup="calcNewPoints()"> <br>
                    New Points: {{fpr.points}}
                </td>
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
          <h3>Últimos registros de metas e resultados [play reports] | {{qtd}} registros encontrados | <span class="green">{{total_points==undefined ? 0 : total_points}}</span> points verificados. <span class="price">{{UTILS.priceCoin(total_points,'slp')}}</span></h3>
          <table class="tb1">
              <tr>
                  <th>#ID</th>
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
                  <td>
                      <span class="player-parent"> 
                            <span class="foto-user-list" v-if="v.foto_url" v-bind:style="{ backgroundImage: UTILS.url(v.foto_url) }"></span> 
                            {{v.player_nome}} #{{v.idusuarios}}
                        </span>
                  </td>
                  <td>{{v.meta_points}}</td>
                  <td>{{v.points}} <span class="price">{{UTILS.priceCoin(v.points,'slp')}}</span></td>
                  <td>{{v.comments}}</td>
                  <td v-html="UTILS.vStatusPlayReports(v.status)"></td>
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
            },
            dpr: [],
            qtd: 0,
            total_points: 0,
            points: 0,
            UTILS,
            dprStatus: 0
        }
    },
    methods: {
        buscaTodosPR(){
            let idbusca = this.idagree ? this.idagree : 0
            PLAYREPORTS.buscaTodosPlayReports(idbusca)
            .then(r => {
                
                this.dpr = r.data.rr
                if(this.dpr){
                    this.total_points = this.dpr[0].total_points
                    this.dprStatus = this.dpr[0].status_ag
                }else{
                    this.total_points = 0
                    this.dprStatus = 0
                }

                return this.qtd = r.data.qtd
            })
            .catch(err => {
                return console.log(err);
            })
        },
        novoPR(){
            if(!this.fpr.points || this.fpr.points==null){
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
        },
        calcNewPoints(){
            if(this.total_points>0){
                return this.fpr.points = (this.points - this.total_points)
            }else{
                return this.fpr.points = this.points
            }
        }
    },
    mounted(){
        return this.buscaTodosPR()
    }
}
</script>

<style>

</style>