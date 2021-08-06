<template>
      <div class="content1">
          <h2><router-link to="/">Dashboard</router-link> | + Nova Play-Account</h2>
          <form @submit.prevent="cadastraNovaPA">
              <table class="tb2">
                <tr>
                    <th>Selecione o Jogo: [game]</th>
                    <td><select name="game" id="game" v-model="fpa.idgame" @change="ronin=true">
                        <option value="1">Axie Infinity</option></select></td>
                </tr>
                <tr v-if="ronin==true">
                    <th>Ronin Wallet - Address (ronin:xxx...)</th>
                    <td><input type="text" name="contract_address" size="50" v-model="fpa.contract_address"></td>
                </tr>
                <tr>
                    <th>Titulo</th>
                    <td><input type="text" name="titulo" v-model="fpa.titulo"></td>
                    
                </tr>
                <tr>
                    <th>Informações (Opcional) (*) <i>Visíveis apenas para você.</i></th>
                    <td><textarea name="infor" id="infor" v-model="fpa.infor" cols="50" rows="2"></textarea></td>
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
                    <th colspan="2">Configurações</th>
                </tr>
                <tr>
                    <th>Game Login (*) Os dados de Login e Pass do jogo serão encaminhados por email apenas para o jogador que você escolheu. </th>
                    <td><input type="text" name="game_login" v-model="fpa.game_login"></td>
                </tr>
                <tr>
                    <th>Game Password</th>
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
                infor: null,
                cost_total: null,
                cost_currency: null,
                game_login: null,
                game_pass: null,
                contract_address: null,
                api_data: null
            },
            qv: 0,
            manager: JSON.parse(localStorage.getItem('_user')),
            btf: true,
            listaError: false,
            ronin: false
        }
    },
    methods: {
        async cadastraNovaPA(){

            this.btf = false
            this.fpa.cost_total = this.fpa.cost_total != null ? this.fpa.cost_total.replace(',','.') : null

            //BUSCA DADOS USARIO API AXI INFINITY
            var ron = this.fpa.contract_address.split(':');
            var aa = await PLAYCCS.buscaDadosAPIAxie(ron[1]);

            this.fpa.api_data = JSON.stringify(aa.data)

            PLAYCCS.cadastraNovaPlayAcc(this.fpa)
            .then(r => {
                alert('Conta cadastrada com sucesso.')
                return this.$router.push('/play-accounts');
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