<template>
<div class="content-u">
    <div class="content1">
<div class="contratos">
      <h3><router-link to="/">DashBoard</router-link> | Proposta de contratação | Player: {{da[0].player_name}}</h3>
      <table class="tb1">
              <tr>
                  <th>Player [codename]</th>
                  <td>{{da[0].player_name}}</td>
              </tr>
              <tr>
                  <th>Player [apresentação]</th>
                  <td>{{da[0].player_about}}</td>
              </tr>
              <tr>
                  <th>Games [experiência]</th>
                  <td>{{verGames(da[0].player_games) }}</td>
              </tr>
          </table>
          <h3>Proposta:</h3>
      <form @submit.prevent="FazerNovaProposta">
        <table class="tb1">
            <tr>
                <th>Play-Account (*)</th>
                <td>
                    <select name="play-acc" id="play-acc" v-model="fm.idplay_acc" >
                        <option v-for="v of da" :key="v.id" :value="v.idplay_acc">{{v.titulo + ' | ' + v.games_name}}</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Termos e Condições (*)</th>
                <td><textarea id="termos" name="termos" rows="4" v-model="fm.termos"></textarea>
                <p>(*) INFORMAÇÕES RECOMENDADAS: Descrever Metas e objetivos, datas de pagamentos;</p></td>
            </tr>
            <tr>
                <th>Meta [pontos] (*)</th>
                <td><input type="text" name="meta_points" v-model="fm.meta_points"></td>
            </tr>
            <tr>
                <th>Meta [registro] (*)</th>
                <td>
                    <select name="meta_record" v-model="fm.meta_record">
                        <option value="1">DIÁRIA</option>
                        <option value="2">MENSAL</option>
                        <option value="3">ANUAL</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Share [% de participação] 0 a 100 (*)</th>
                <td><input type="text" name="share" v-model="fm.share"></td>
            </tr>
            <tr>
                <th>Método de Pagamento</th>
                <td>
                    <select name="payment_type" id="payment_type" v-model="fm.payment_type">
                        <option value="1">Cripto (Bitcoin | BTC)</option>
                        <option value="2">Cripto (Etherem | ETH)</option>
                        <option value="3">Cripto (Dólar Tether | USDT)</option>
                        <option value="4">Transferência Bancária (Dinheiro)</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td></td>
                <td><button type="submit" v-if="btf">ENVIAR</button></td>
            </tr>
        </table>
        <p>(*) Campos obrigatórios</p>
      </form>
  </div>
    </div>
</div>
  
</template>

<script>
import NOVOACORDO from '../services/agreements'
export default {
    data(){
        return {
            idplayer: this.$route.params.idp,
            fm: {
                idplayer: this.$route.params.idp,
                idplay_acc: null,
                termos: null,
                meta_points: null,
                meta_record: null,
                share: null,
                payment_type: null
            },
            da: [{0:{player:null}}],
            btf: true
        }
    },
    methods:{
        buscaDadosParaAcordo(){
            NOVOACORDO.buscaDadosParaNovoAcordo(this.idplayer)
            .then(r => {
                this.da = r.data.busca
                return 
            })
            .catch(err => {
                alert(err.response.data.error);
                return this.$router.push('/')
            })
        },
        FazerNovaProposta(){

            this.btf = false
            this.fm.idgames = this.da[0].idgames

            NOVOACORDO.enviarPropostaDeAcordo(this.fm)
            .then(r => {
                this.btf = true
                alert('Proposta enviada com sucesso.')
                return this.$router.push('/')
            })
            .catch(err => {
                this.btf = true
                console.log(err);
                return alert('Ocorreu um erro. Por favor, tente mais tarde.')
            })
        },
        verGames(v){
            if(!v) return
           var vv = v.split(',')
           var vvv = ''
           for(var x in vv){
               vvv += vv[x] + ' | '
           }
            return vvv
        }
    },
    created(){
        return this.buscaDadosParaAcordo()
    }
}
</script>

<style>

</style>