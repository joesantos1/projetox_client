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
                            <option value="BTC">Bitcoin (BTC)</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Game Login (*) Os dados de Login e Pass do jogo serão encaminhados por email apenas para o jogador que você escolheu. </th>
                    <td><input type="text" name="game_login" v-model="fpa.game_login"></td>
                </tr>
                <tr>
                    <th>Game Pass</th>
                    <td><input type="text" name="game_pass" v-model="fpa.game_pass"></td>
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
                      <tr>
                          <th>Game Login</th>
                          <td>{{fpa.game_login}}</td>
                      </tr>
                      <tr>
                          <th>Game Pass (*)</th>
                          <td>- Solicitar Game Pass</td>
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
                          <th colspan="6">Axie Infinity : Infor</th>
                      </tr>
                      <tr>
                          <th>SLP total</th>
                          <th>SLP [p/ day]</th>
                          <th>SLP Claim [data]</th>
                          <th>Total Claim [SLP]</th>
                          <th>Next Claim</th>
                      </tr>
                      <tr>
                          <td>{{axs.slp_total}} <span class="price">{{UTILS.priceCoin(axs.slp_total,'slp')}}</span></td>
                          <td>{{axs.slp_avg.toFixed(0) }} <span class="price">{{UTILS.priceCoin(axs.slp_avg,'slp')}}</span></td>
                          <td>{{UTILS.timeConverter(axs.last_claim,0)}} </td>
                          <td>{{axs.last_claim_slp}} <span class="price">{{UTILS.priceCoin(axs.last_claim_slp,'slp')}}</span></td>
                          <td>{{UTILS.timeConverter(axs.last_claim,1296000000)}}</td>
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
            edit: false
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

                    this.axs.slp_total = axsData.total
                    this.axs.last_claim = axsData.blockchain_related.signature.timestamp
                    this.axs.last_claim_slp = axsData.blockchain_related.signature.amount

                    
                    
                    let hoje = new Date()
                    let day1 = dayjs(hoje)
                    let day2 = dayjs(this.axs.last_claim*1000)
                    
                    this.axs.slp_avg = (axsData.total / day1.diff(day2,'day'))

                }else{

                    if(this.fpa.contract_address){
                        //BUSCA DADOS USARIO API AXI INFINITY
                        var ron = this.fpa.contract_address.split(':');
                        var aa = await PLAYACC.buscaDadosAPIAxie(ron[1]);

                        this.fpa.api_data = JSON.stringify(aa.data)

                        //ATUALIZA INFORMACOES DE API NO DB DA PLAY-ACC
                        await PLAYACC.atualizaPlayAcc(this.fpa)

                        //CARREGA DADOS DA API 
                        axsData = this.fpa.api_data
                        this.axs.slp_total = axsData.total
                        this.axs.last_claim = axsData.blockchain_related ? axsData.blockchain_related.signature.timestamp : 0;
                        this.axs.last_claim_slp = axsData.blockchain_related ? axsData.blockchain_related.signature.amount : 0

                        
                        
                        let hoje = new Date()
                        let day1 = dayjs(hoje)
                        let day2 = dayjs(this.axs.last_claim*1000)
                        
                        this.axs.slp_avg = (axsData.total / day1.diff(day2,'day'))

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
        updPlayAcc(){
            this.btf = false

            this.fpa.cost_total = this.fpa.cost_total != null ? this.fpa.cost_total.replace(',','.') : null

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