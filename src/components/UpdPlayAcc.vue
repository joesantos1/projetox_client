<template>
      <div class="content1">
          <h2><router-link to="/">Dashboard</router-link> > Edit Play-Account</h2>
          <form @submit.prevent="updPlayAcc" v-if="owner">
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
                    <th>Titulo</th>
                    <td><input type="text" name="titulo" v-model="fpa.titulo"></td>
                    
                </tr>
                <tr>
                    <th>Informações (Opcional) (*) <i>Visíveis apenas para você.</i></th>
                    <td><textarea name="infor" id="infor" v-model="fpa.infor" cols="30" rows="10"></textarea></td>
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
                    <td><button v-if="btf" type="submit">Salvar</button></td>
                </tr>
              </table>
          </form>
          <table class="tb1" v-else>
                  <tr>
                      <th>GAME</th>
                      <td>{{fpa.idgame==1 ? 'Axie Infinity' : ''}}</td>
                  </tr>
                  <tr>
                      <th>Play-Account [titulo]</th>
                      <td>{{fpa.titulo}}</td>
                      
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
          <h3>Acordos (Agreements) | <button @click="verAcordos()">{{mostrar}}</button></h3>
            <div v-if="mostrar=='ocultar'">
                <table class="tb1" v-if="fpa.player_id" >
                    <tr>
                        <th>STATUS</th>
                        <td>{{UTILS.vStatusAgreement(fpa.a_status)}}</td>
                    </tr>
                    <tr>
                        <th>PLAYER [codename]</th>
                        <td>{{fpa.player_nome}} #00{{fpa.player_id}}</td>
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
                </table>
                <span v-else>Nenhum contrato em negociação.</span>
            </div>
          
          <div v-if="listaError" class="errors" @click="listaError=false">{{listaError}}</div>

          <PLAYREPORTS :owner="owner" :idagree="fpa.idagreements" v-if="fpa.a_status==3" />
      </div>
</template>

<script>
import UTILS from '@/utils/utils'
import PLAYACC from '../services/playacc'
import PLAYREPORTS from '@/components/PlayReports.vue'
import MYSALES from '@/components/MySales.vue'

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
        }
    },
    methods: {
        buscaPlayAccParaUpd(){
            
            PLAYACC.buscaParaUpdPlayAcc(this.paID)
            .then(r => {
                
                this.owner = r.data.owner
                this.fpa = r.data.rr
                return this.calculaValor()
                
            })
            .catch(err => {
                return alert(err)
            })
        },
        updPlayAcc(){
            this.btf = false
            PLAYACC.atualizaPlayAcc(this.fpa)
            .then(r => {
                this.btf = true
                return alert('Conta atualizada com sucesso.');
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
        }

    },
    created(){
        return this.buscaPlayAccParaUpd()
    }
}
</script>

<style>

</style>