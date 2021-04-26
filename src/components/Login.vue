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
      <div class="errors" v-if="listaError" @click="listaError=false">{{listaError}}</div>
  </div>
</template>

<script>
import auth from '../services/auth'
export default {
    data(){
        return {
            email: null,
            pass: null,
            listaError: false
        }
    },
    methods:{
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

</style>