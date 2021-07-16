<template>
  <div>
      <div class="login">
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
      </div>
      <div class="cadastro">
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
                <td></td>
                <td><button type="submit" v-if="btf">CADASTRAR</button> <button type="reset">LIMPAR</button></td>
            </tr>
        </table>
    </form>
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
    margin: 50px 500px;
    width: 300px;
}
</style>