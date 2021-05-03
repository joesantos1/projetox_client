<template>
  <div class="content-u">
    <div class="content1 meusdados">
      <h4>MEUS DADOS:</h4>
      <form @submit.prevent="atualizaMeusDados">
        <table>
          <tr>
            <th>NOME</th>
            <td><input type="text" name="nome" v-model="fm.nome"></td>
          </tr>
          <tr>
              <th>EMAIL</th>
              <td><input type="text" name="email" v-model="fm.email"></td>
          </tr>
          
          <tr>
            <th>TEL 1</th>
            <td><input type="text" name="tel1" v-model="fm.tel1"></td>
          </tr>
          <tr>
            <th>CIDADE</th>
            <td><input type="text" name="cidade" v-model="fm.cidade"></td>
          </tr>
          <tr>
            <td></td>
            <td><button type="submit">ATUALIZAR DADOS</button></td>
          </tr>
        </table>

      </form>
      <h4>ALTERAR MINHA SENHA:</h4>
      <form @submit.prevent="atualizaMinhaSenha">
        <table>
          <tr>
            <th>SENHA ATUAL</th>
            <td><input type="password" name="pass" v-model="fmp.pass"></td>
          </tr>
          <tr>
            <th>NOVA SENHA</th>
            <td><input type="password" name="pass_new" v-model="fmp.pass_new"></td>
          </tr>
          <tr>
            <th>CONFIRMA NOVA SENHA</th>
            <td><input type="password" name="pass_new_confirm" v-model="fmp.pass_new_confirm"></td>
          </tr>
          <tr>
            <td></td>
            <td><button type="submit">ALTERAR SENHA</button></td>
          </tr>
        </table>
      </form>
      <table>

      </table>
    </div>
  </div>
</template>

<script>

import DATAUSER from '../services/dataUser'
export default {
  data(){
    return {
      fm: JSON.parse(localStorage.getItem('_user')),
      fmp: {
        pass: null,
        pass_new: null,
        pass_new_confirm: null
      }
    }
  },
  methods:{
    atualizaMeusDados(){

      DATAUSER.atualizaDadosUsuario(this.fm)
      .then(r => {
        return alert('Dados atualizados com sucesso.')
      })
      .catch(err => {
        return alert(err)
      })
    },
    atualizaMinhaSenha(){

      if(this.fmp.pass==null || this.fmp.pass_new==null){
        return alert('Por favor, digite uma senha.')
      }

      if(this.fmp.pass_new_confirm != this.fmp.pass_new){
        return alert('Novas senhas não conferem.')
      }

      DATAUSER.atualizaSenhaUsuario(this.fmp)
      .then(r => {
        return alert('Senha atualizada com sucesso.')
      })
      .catch(err => {
        return alert(err.response.data.error)
      })
    }
  }
}
</script>

<style>
.meusdados table th{
  text-align: right;
}
.meusdados table {
  width: 100%;
}
</style>