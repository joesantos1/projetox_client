<template>
      <div class="content1">
          <h2><router-link to="/">Dashboard</router-link> | + Nova Play-Account</h2>
          <form @submit.prevent="cadastraNovaPA">
              <table class="tb2">
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
                    <th>Venda de Cotas e Participações</th>
                    <td><select name="quota_system" id="quota_system" v-model="fpa.quota_system">
                        <option value="1">SIM</option>
                        <option value="2">NÃO</option>
                        </select></td>
                </tr>
                
                <tr v-if="fpa.quota_system==1">
                    <th>Quantidade de Cotas [total]</th>
                    <td><input type="text" name="quota_total" v-model="fpa.quota_total" @keyup="calculaValor()"></td>
                </tr>
                <tr v-if="fpa.quota_system==1">
                    <th>Participação Cotistas [share] (%)</th>
                    <td><input type="text" name="quota_share" v-model="fpa.quota_share"></td>
                </tr>
                <tr v-if="fpa.quota_system==1">
                    <th>01 Cota [price - in USD]</th>
                    <td><input type="text" name="quota_price" v-model="fpa.quota_price" @keyup="calculaValor()"><p>Total: ${{qv}}</p> </td>
                </tr>
                <tr v-if="fpa.quota_system==1">
                    <th>Pagamento [currency]</th>
                    <td><select name="currency" id="currency" v-model="fpa.quota_currency">
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="SLP">Smooth Love Potion (SLP)</option>
                        <option value="USDT">Dóllar Tether (USDT)</option>
                        </select></td>
                </tr>
                <tr v-if="fpa.quota_system==1">
                    <th>Data de validade da oferta [expires] 00/00/0000</th>
                    <td><input type="text" name="expires" v-model="fpa.quota_expires"></td>
                </tr>
                <tr v-if="fpa.quota_system==1">
                    <th>Manager #ID</th>
                    <td>#0{{manager['iduser'] + ' ' + manager['nome']}}</td>
                </tr>
                <tr>
                    <th colspan="2">Configurações</th>
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
          <div v-if="listaError" class="errors" @click="listaError=false">{{listaError}}</div>
      </div>
</template>

<script>
import PLAYCCS from '../services/playacc';
export default {
    data(){
        return {
            fpa: {
                idgame: null,
                titulo: null,
                game_login: null,
                game_pass: null,
                quota_system: 2,
                quota_total: null,
                quota_share: null,
                quota_price: null,
                quota_currency: null,
                quota_expires: null
            },
            qv: 0,
            manager: JSON.parse(localStorage.getItem('_user')),
            btf: true,
            listaError: false
        }
    },
    methods: {
        cadastraNovaPA(){

            for(var v in this.fpa){
                if(this.fpa[v]==null || this.fpa[v]==' '){
                    return this.listaError = 'Por favor, preencha todos os campos.'
                }
            }

            this.btf = false

            PLAYCCS.cadastraNovaPlayAcc(this.fpa)
            .then(r => {
                alert('Conta cadastrada com sucesso.')
                return location.replace('/');
            })
            .catch(error => {
                this.btf = true;
                return alert(error)
            })

        },
        calculaValor(){
            let num = parseFloat(this.fpa.quota_price)
            let tot = parseInt(this.fpa.quota_total)
            return this.qv = (num * tot) 
        }
    }

}
</script>

<style>

</style>