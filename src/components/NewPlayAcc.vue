<template>
  <div class="content-user">
      <div class="content1">
          <h2>+ Nova Play-Account</h2>
          <form @submit.prevent="cadastraNovaPA">
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
                          <td><input type="text" name="meta" v-model="fpa.meta"></td>
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
                          <td></td>
                          <td><button v-if="btf" type="submit">Salvar</button></td>
                      </tr>
              </table>
          </form>
          <div v-if="listaError" class="errors" @click="listaError=false">{{listaError}}</div>
      </div>

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
                meta: null,
                deal: null,
                game_login: null,
                game_pass: null
            },
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

        }
    }

}
</script>

<style>

</style>