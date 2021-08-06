<template>
      <div class="content1">
          <h2><router-link to="/">Dashboard</router-link> > My Play-Account</h2>
          <div class="edit" v-if="owner && edit">
            <form @submit.prevent="updPlayAcc" >
              <table class="tb2">
                  <tr>
                      <th>#ID Play-Account</th>
                      <td>#{{fpa.idplay_accounts}}</td>
                  </tr>
                  <tr>
                      <th>STATUS</th>
                      <td v-html="UTILS.vStatusPlayAcc(fpa.status)"></td>
                  </tr>
                <tr>
                    <th>Selecione o Jogo: [game]</th>
                    <td><select name="game" id="game" v-model="fpa.idgame">
                        <option value="1">Axie Infinity</option></select></td>
                </tr>
                <tr>
                    <th>Ronin Wallet - Address (ronin:xxx...)</th>
                    <td><input type="text" name="contract_address" size="50" v-model="fpa.contract_address"></td>
                </tr>
                <tr>
                    <th>Titulo</th>
                    <td><input type="text" name="titulo" v-model="fpa.titulo"></td>
                    
                </tr>
                <tr>
                    <th>Informações (Opcional) (*) <i>Visíveis apenas para você.</i></th>
                    <td><textarea name="infor" id="infor" v-model="fpa.infor" cols="50" rows="3"></textarea></td>
                </tr>
                <tr>
                    <th>Custo total [investiment] (*) <i>Apenas números. (0.00)</i></th>
                    <td><input type="text" name="cost_total" v-model="fpa.cost_total"></td>
                </tr>
                <tr>
                    <th>Custo [currency]</th>
                    <td>
                        <select name="cost_currency" v-model="fpa.cost_currency" id="">
                            <option value="ETH">Ethereum (ETH)</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Comprado em</th>
                    <td>
                        <input type="text" name="data_buy" v-model="fpa.data_buy" v-mask="'##/##/####'">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><button v-if="btf" type="submit">Salvar</button> <button @click="edit=false">Hide</button></td>
                </tr>
              </table>
          </form>
          </div>
          
          <table class="tb1" v-if="!owner">
                  <tr>
                      <th>GAME</th>
                      <td>{{fpa.idgame==1 ? 'Axie Infinity' : ''}}</td>
                  </tr>
                  <tr>
                      <th>Play-Account [titulo] #ID</th>
                      <td>{{fpa.titulo}} #{{fpa.idplay_accounts}}</td>
                      
                  </tr>
              </table>
              <p><button v-if="owner" @click="edit=true">EDIT PLAY-ACCOUNT</button></p>
              
          <h3>Acordos (Agreements) | <button @click="verAcordos()">{{mostrar}}</button></h3>
            <div v-if="mostrar=='ocultar'">
                <table class="tb1" v-if="fpa.player_id" >
                    <tr>
                        <th>CONTRACT #ID</th>
                        <td>#{{fpa.idagreements}}</td>
                    </tr>
                    <tr>
                        <th>STATUS</th>
                        <td>{{UTILS.vStatusAgreement(fpa.a_status)}}</td>
                    </tr>
                    <tr>
                        <th>PLAYER [codename]</th>
                        <td>
                            <span class="player-parent"> 
                                <span class="foto-user-list" v-if="fpa.foto_url" v-bind:style="{ backgroundImage: UTILS.url(fpa.foto_url) }"></span> 
                                {{fpa.player_nome}} #{{fpa.player_id}}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th>TERMOS</th>
                        <td>{{fpa.termos}}</td>
                    </tr>
                    <tr>
                        <th>META [points]</th>
                        <td>{{fpa.meta_points}}</td>
                    </tr>
                    <tr>
                        <th>META [record]</th>
                        <td>{{UTILS.vMetaRecord(fpa.meta_record)}}</td>
                    </tr>
                    <tr>
                        <th>(%) SHARE</th>
                        <td>{{fpa.share}}</td>
                    </tr>
                    <tr>
                        <th>Método de Pagamento</th>
                        <td>{{UTILS.vPaymentType(fpa.payment_type)}}</td>
                    </tr>
                    <tr>
                        <th>Enviado em</th>
                        <td>{{UTILS.formatData(fpa.a_data) }}</td>
                    </tr>
                    <tr>
                        <th>Atualizado em</th>
                        <td>{{UTILS.formatData(fpa.u_data) }}</td>
                    </tr>
                    <tr align="center" v-if="owner">
                        <td colspan="2"><button @click="cancelaContrato(fpa.idagreements,4,fpa.idplay_accounts, fpa.player_id)">CANCEL CONTRACT</button></td>
                    </tr>
                </table>
                <span v-else>Nenhum contrato em negociação.</span>
            </div>
          
          <div v-if="listaError" class="errors" @click="listaError=false">{{listaError}}</div>
          <div v-if="owner">
              <p>
                  <table class="tb1">
            <tr>
                <th>TOTAL INVESTED</th>
                <td>{{all.total_invested}} <span class="price">{{UTILS.priceCoin(all.total_invested,'ethereum')}}</span></td>
                <th>ROI (%)</th>
                <td>{{all.roi.toFixed(2)}}%</td>
                <th>ROI [p/ day] (%)</th>
                <td>{{all.roi_day.toFixed(2)}}%</td>
            </tr>
            <tr>
                <th>SLP TOTAL</th>
                <td>{{all.total_slp}} <span class="price">{{UTILS.priceCoin(all.total_slp,'smooth-love-potion')}}</span></td>
                <th>SLP TOTAL [claimed]</th>
                <td>{{all.total_claimed}} <span class="price">{{UTILS.priceCoin(all.total_claimed,'smooth-love-potion')}}</span></td>
                <th>SLP Avg/Day</th>
                <td>{{all.total_slp_avg.toFixed(0)}} <span class="price">{{UTILS.priceCoin(all.total_slp_avg,'smooth-love-potion')}}</span></td>
            </tr>
            <tr>
                <th>Next Claim</th>
                <td>{{UTILS.timeConverter(all.next_claim,1209600000)}}</td>
                <th>Next Claim [account]</th>
                <td>{{all.next_claim_acc}}</td>
                <th>Next Claim [SLP]</th>
                <td>{{all.next_claim_slp}}<span class="price">{{UTILS.priceCoin(all.next_claim_slp,'smooth-love-potion')}}</span></td>
            </tr>
            <tr>
                <td colspan="7" align="center"><button @click="updApiData()">ATUALIZAR DADOS</button></td>
            </tr>
        </table>
              </p>
          </div>
          

          <PLAYREPORTS :owner="owner" :idagree="fpa.idagreements" v-if="fpa.a_status==3" />
      </div>
</template>

<script>
import UTILS from '@/utils/utils'
import PLAYACC from '../services/playacc'
import PLAYREPORTS from '@/components/PlayReports.vue'
import MYSALES from '@/components/MySales.vue'
import dayjs from 'dayjs'
import PROPOSTAS from '../services/agreements'

export default {
    components:{
        PLAYREPORTS,
        MYSALES
    },
    data(){
        return {
            UTILS,
            paID: this.$route.params.id,
            fpa: [],
            btf: true,
            listaError: false,
            owner: false,
            mostrar: 'mostrar',
            qv: 0,
            manager: JSON.parse(localStorage.getItem('_user')),
            axs: [],
            coins: JSON.parse(localStorage.getItem('coinmarket')),
            curr: localStorage.getItem('currency'),
            edit: false,
            all: {
                total_slp: 0,
                total_claimed: 0,
                total_slp_avg: 0,
                next_claim: 0,
                roi:0,
                roi_day:0,
                total_invested:0
            },
        }
    },
    methods: {
        async buscaPlayAccParaUpd(){
            
            PLAYACC.buscaParaUpdPlayAcc(this.paID)
            .then(async r => {
                
                this.owner = r.data.owner
                this.fpa = r.data.rr

                let axsData = r.data.rr.api_data

                if(axsData || axsData != null){

                    this.dadosApi(this.fpa)

                }else{

                    if(this.fpa.contract_address){
                        //BUSCA DADOS USARIO API AXI INFINITY
                        var ron = this.fpa.contract_address.split(':');
                        var aa = await PLAYACC.buscaDadosAPIAxie(ron[1]);

                        this.fpa.api_data = JSON.stringify(aa.data)

                        //ATUALIZA INFORMACOES DE API NO DB DA PLAY-ACC
                        await PLAYACC.atualizaPlayAcc(this.fpa)

                        //CARREGA DADOS DA API 
                        this.dadosApi(this.fpa)

                    }else{
                        this.fpa.api_data = null
                    }
                }

                
                return this.calculaValor()
                
            })
            .catch(err => {
                return alert(err)
            })
        },
        dadosApi(data){
             let all = this.all
            let mm = data
            let hoje = new Date()
            let tdia = 0
                    
            //CALCULA TOTAL INVESTIDO NAS CONTAS
            all.total_invested = mm.cost_total

            //CALCULA TOTAL DE SLPS
            let mmm = mm.api_data
            all.total_slp += mmm.blockchain_related.checkpoint
            all.total_slp += mmm.total
            all.total_claimed = mmm.blockchain_related.checkpoint

            //CALC AVG SLP/DIA
            let lastc = mmm.blockchain_related.signature.timestamp;
            
            let day1 = dayjs(hoje)
            let day2 = dayjs(lastc*1000)
            
            if(mmm.total>0){
                tdia = (mmm.total / day1.diff(day2,'day'))
            } 

            //BUSCA DATA DE CLAIM MAIS PROXIMA [NEXT CLAIM]
            if(all.next_claim==0) all.next_claim = lastc
            if(lastc < all.next_claim){
                all.next_claim = lastc
                all.next_claim_slp = mmm.total
            } 
            
            all.total_slp_avg = tdia <=0 ? 1 : tdia

            //CALC DE ROI
            let coinm = JSON.parse(localStorage.getItem('coinmarket'))
            let curr = localStorage.getItem('currency')
            all.roi = ((all.total_slp*coinm['smooth-love-potion'][curr]) / (all.total_invested*coinm['ethereum'][curr]))*100
            all.roi_day = ((tdia*coinm['smooth-love-potion'][curr]) / (all.total_invested*coinm['ethereum'][curr]))*100
        },
        async updApiData(){
            //BUSCA DADOS USARIO API AXI INFINITY
            var ron = this.fpa.contract_address.split(':');
            var aa = await PLAYACC.buscaDadosAPIAxie(ron[1]);

            this.fpa.api_data = JSON.stringify(aa.data)

            //ATUALIZA INFORMACOES DE API NO DB DA PLAY-ACC
            PLAYACC.atualizaPlayAcc(this.fpa)
            .then(() => {
                return this.$router.go()
            })
        },
        updPlayAcc(){
            this.btf = false
            let ccc = '"'+this.fpa.cost_total+'"'
            if(ccc){

                if(ccc.indexOf(",")>-1){
                    this.fpa.cost_total.replace(',','.')
                }

            }else{
                this.fpa.cost_total = null
            }
            this.fpa.api_data = JSON.stringify(this.fpa.api_data)

            PLAYACC.atualizaPlayAcc(this.fpa)
            .then(r => {
                this.btf = true
                alert('Conta atualizada com sucesso.');
                return this.$router.go()
            })
            .catch(err => {
                this.btf = true
                return alert(err)
            })
        },
        verAcordos(){
            if(this.mostrar == 'mostrar') return this.mostrar = 'ocultar'
            if(this.mostrar == 'ocultar') return this.mostrar = 'mostrar'
        },
        calculaValor(){
            let num = parseFloat(this.fpa.quota_price)
            let tot = parseInt(this.fpa.quota_total)
            return this.qv = (num * tot) 
        },
        cancelaContrato(idp,v,idpa, idu){

            var da = {idp,tipo: v, idpa, idu}

            PROPOSTAS.enviaAceiteProposta(da)
            .then(r => {
                alert('Contrato cancelado com sucesso.')
                return this.$router.go()
            })
            .catch(err => {
                return console.log(err);
            })
        }

    },
    created(){
        return this.buscaPlayAccParaUpd()
    }
}
</script>

<style>

</style>