<template>
  <div>
      <div class="login">
          <h2>Bookplyr</h2>
          <div class="content2">
        <h3>LOGIN</h3>
          <form @submit.prevent="fazerLogin">
          <table cellspacing="0px">
              <tr>
                  <td>EMAIL:</td>
                  <td><input type="text" name="email" v-model="email"></td>
              </tr>
              <tr>
                  <td>SENHA:</td>
                  <td><input type="password" name="pass" v-model="pass"></td>
              </tr>
              <tr>
                  <td></td>
                  <td><button type="submit">ENTRAR</button></td>
              </tr>
          </table>
          </form>
          <p><i>v1. Beta</i></p>
          </div>
          
      </div>
      <div class="cadastro">
          <div class="content2">
        <h3>CADASTRO</h3>
            <form @submit.prevent="fazerCadastro">
        <table class="cadastro-user" cellspacing="10px">
            <tr>
                <th>NOME</th>
                <td><input type="text" name="nome" v-model="fm.nome"></td>
            </tr>
            <tr>
                <th>EMAIL</th>
                <td><input type="text" name="email" v-model="fm.email"></td>
            </tr>
            <tr>
                <th>SENHA</th>
                <td><input type="password" name="pass" v-model="fm.pass"></td>
            </tr>
            <tr>
                <th>CONFIRMA SENHA</th>
                <td><input type="password" name="confirm_pass" v-model="fm.pass_confirm"></td>
            </tr>
            <tr>
                <th>Blockchain Games, NFTs, RPG, MMOs e outros. (Expert)</th>
                <td>
                    <input type="checkbox" id="x0" name="games" value="Axie Infinity" v-model="xp"> 
                    <label for="x0">Axie Infinity</label>

                    <input type="checkbox" id="x1" name="games" value="Alien Word" v-model="xp"> 
                    <label for="x1">Alien World</label>
                    
                    <input type="checkbox" id="x2" name="games" value="Decentraland" v-model="xp"> 
                    <label for="x2">Descentraland</label>

                    <input type="checkbox" id="x3" name="games" value="MyPet" v-model="xp"> 
                    <label for="x3">My DefiPet</label>
                    <input type="checkbox" id="x4" name="games" value="CryptoBlades" v-model="xp"> 
                    <label for="x4">CryptoBlades</label>
                    <input type="checkbox" id="x5" name="games" value="SplinterLands" v-model="xp"> 
                    <label for="x5">SplinterLands</label>
                    <input type="checkbox" id="x6" name="games" value="Faraland" v-model="xp"> 
                    <label for="x6">Faraland</label>
                </td>
            </tr>
            <tr>
                <th>CATEGORIA</th>
                <td>
                    <select name="categoria" id="categoria" v-model="fm.categoria">
                        <option value="1">SOU JOGADOR (PLAYER)</option>
                        <option value="2">QUERO SELECIONAR JOGADORES (OWNER)</option>
                        <option value="3">SOU AMBOS</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td></td>
                <td><button type="submit" v-if="btf">CADASTRAR</button> <button type="reset">LIMPAR</button></td>
            </tr>
        </table>
    </form>
          </div>
        
      </div>
      
      <div class="errors" v-if="listaError" @click="listaError=false">{{listaError}}</div>
  </div>
</template>

<script>
import auth from '../services/auth'
import CAD_USER from '../services/dataUser'
export default {
    data(){
        return {
            email: null,
            pass: null,
            listaError: false,
            xp: [],
            fm: {
                nome: null,
                email: null,
                pass: null,
                pass_confirm: null,
                refsId: 1
            },
            btf:true
        }
    },
    methods:{
        fazerCadastro(){
            
            for(var v in this.fm){
                if(this.fm[v]==null || this.fm[v]==' '){
                    return this.listaError = 'Por favor, preencha todos os campos obrigatórios.'
                }
            }

            if(this.fm.pass != this.fm.pass_confirm){
                return this.listaError = 'Senhas não conferem.'
            }

            this.btf = false
            this.fm.lista_games = this.xp

           CAD_USER.cadastraUsuario(this.fm)
           .then(r => {
               if(r){
                   var _user = JSON.stringify(r.data.user.userData)

                    localStorage.setItem('_user', _user)
                    localStorage.setItem('access_token', r.data.user.token)
                    
                    return location.replace('/')
                }
           })
           .catch(err => {
               this.btf = true
               return this.listaError = err.response.data.error
           })

        },
        fazerLogin(){
            const email = this.email
            const pass = this.pass

            if(email == null || pass == null || email == ' '){
                return this.listaError = 'Por favor, digite um email e senha válidos.';
            }

            const dados = {email, pass};

            auth.authUser(dados).then(r => {

                var _user = JSON.stringify(r.data.user.userData)

                localStorage.setItem('_user', _user)
                localStorage.setItem('access_token', r.data.user.token)
                
                return location.replace('/')
            }).catch(error => {
                
                return this.listaError = error.response.data.error
            })
        }
    }

}
</script>

<style>
.login{
    width: 50%;
    height: 100%;
    background-color: rgb(236, 236, 236);
    color: rgb(61, 61, 61);
    position: fixed;
    left: 0pt;
    top: 0pt;
    padding: 1em;
}
.cadastro{
    width: 50%;
    height: 100%;
    background-color: rgb(87, 87, 87);
    color: white;
    position: fixed;
    left: 50%;
    top: 0pt;
    border-left: 20px solid grey;
}
.content2{
    margin: 40px;
}
</style>