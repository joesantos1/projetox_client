<template>
  <div>
       <div class="content-user">
      <div class="content1">
          <h2><router-link to="/">Dashboard</router-link> > (+) Nova Play-Account</h2>
          <form @submit.prevent="updPlayAcc" v-if="owner">
              <table class="tb1">
                  <tr>
                      <th>Selecione o Jogo:</th>
                      <td><select name="game" id="game" v-model="fpa.idgame">
                          <option value="1">Axie Infinity</option></select></td>
                  </tr>
                  <tr>
                      <th>Titulo</th>
                      <td><input type="text" name="titulo" v-model="fpa.titulo"></td>
                      
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
                      <td>{{fpa.idgame}}</td>
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

          <table class="tb1" v-if="mostrar=='ocultar'">
              <tr>
                  <th>STATUS</th>
                  <td>{{UTILS.vStatusAgreement(fpa.a_status)}}</td>
              </tr>
              <tr>
                  <th>PLAYER [codename]</th>
                  <td>{{fpa.player_nome}}</td>
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
          <div v-if="listaError" class="errors" @click="listaError=false">{{listaError}}</div>

          <PLAYREPORTS :owner="owner" :idagree="this.$route.params.idagree" v-if="fpa.a_status==3" />
      </div>

  </div>
  </div>
</template>

<script>
import UTILS from '@/utils/utils'
import PLAYACC from '../services/playacc'
import PLAYREPORTS from '@/components/PlayReports.vue'

export default {
    components:{
        PLAYREPORTS
    },
    data(){
        return {
            UTILS,
            paID: this.$route.params.id,
            fpa: [],
            btf: true,
            listaError: false,
            owner: Boolean,
            mostrar: 'ocultar'
        }
    },
    methods: {
        buscaPlayAccParaUpd(){
            
            PLAYACC.buscaParaUpdPlayAcc(this.paID)
            .then(r => {
                this.owner = r.data.owner
                return this.fpa = r.data.rr
                
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
        }

    },
    created(){
        return this.buscaPlayAccParaUpd()
    }
}
</script>

<style>

</style>