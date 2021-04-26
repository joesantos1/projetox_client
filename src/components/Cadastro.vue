<template>
  <div class="content-user">
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
              <th>INDICADO POR</th>
              <td>{{myup.nome}} | Email: {{myup.email}}</td>
          </tr>
          <tr>
              <td></td>
              <td><button type="submit" v-if="btf">CADASTRAR</button> <button type="reset">LIMPAR</button></td>
          </tr>
      </table>
</form>
    <div v-if="listaError" class="errors" @click="listaError=false">{{listaError}}</div>
  </div>
</template>

<script>
import CAD_USER from '../services/dataUser'
export default {
    data(){
        return{
            fm: {
                nome: null,
                email: null,
                pass: null,
                pass_confirm: null
            },
            myup: JSON.parse(localStorage.getItem('_user')),
            listaError: false,
            btf: true
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
                   for(var v in this.fm){
                        this.fm[v] = null
                    }
                   this.btf = true; 
                   return alert('Cadastro realizado com sucesso.')
                }
           })
           .catch(err => {
               this.btf = true
               return this.listaError = err.response.data.error
           })

        }
    }

}
</script>

<style>
.cadastro-user th{
    text-align: right;
}
</style>