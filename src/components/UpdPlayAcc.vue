<template>
  <div>
       <div class="content-user">
      <div class="content1">
          <h2><router-link to="/">Dashboard</router-link> > (+) Nova Play-Account</h2>
          <form @submit.prevent="updPlayAcc">
              <table>
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
                          <th>Informações, Objetivos, Exigências e etc.</th>
                          <td><input type="text" name="infor" v-model="fpa.infor"></td>
                      </tr>
                      <tr>
                          <th>Metas (*) Somente números. </th>
                          <td><input type="text" name="meta" v-model="fpa.meta_points"></td>
                      </tr>
                      <tr>
                          <th>Deal (Minha participação do resultado (%) | de 0 a 100) (*) Somente números</th>
                          <td><input type="text" name="deal" v-model="fpa.deal"></td>
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
                          <th>STATUS</th>
                          <td>
                              <select name="status" id="status" v-model="fpa.status">
                                  <option value="1">Playing</option>
                                  <option value="2">Aguardando</option>
                                  <option value="0">Desativada</option>
                                  <option value="3">Cancelada</option>
                              </select>
                          </td>
                      </tr>
                      <tr>
                          <td></td>
                          <td><button v-if="btf" type="submit">Salvar</button></td>
                      </tr>
              </table>
          </form>
          <div v-if="listaError" class="errors" @click="listaError=false">{{listaError}}</div>
      </div>

  </div>
  </div>
</template>

<script>
import PLAYACC from '../services/playacc'
export default {
    data(){
        return {
            paID: this.$route.params.id,
            fpa: [],
            btf: true,
            listaError: false
        }
    },
    methods: {
        buscaPlayAccParaUpd(){
            
            PLAYACC.buscaParaUpdPlayAcc(this.paID)
            .then(r => {
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
        }

    },
    mounted(){
        return this.buscaPlayAccParaUpd()
    }
}
</script>

<style>

</style>