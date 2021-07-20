<template>
  <div>
    <div class="content1 meusdados">
      <h4>MEUS DADOS:</h4>
      <form @submit.prevent="atualizaMeusDados">
        <table class="tb1">
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
            <th>NOME</th>
            <td><input type="text" name="nome" v-model="fm.nome"></td>
          </tr>
          <tr>
              <th>EMAIL</th>
              <td><input type="text" name="email" v-model="fm.email"></td>
          </tr>
          <tr>
            <th>DATA DE NASCIMENTO</th>
            <td><input type="text" name="nascimento" v-model="fm.nascimento"></td>
          </tr>
          <tr>
            <th>CPF OU Nº PASSAPORTE</th>
            <td><input type="text" name="cpf" v-model="fm.cpf" value="0"></td>
          </tr>
          <tr>
            <th>TEL 1</th>
            <td><input type="text" name="tel1" v-model="fm.tel1"></td>
          </tr>
          <tr>
            <th>ENDEREÇO:</th>
            <td><input type="text" name="endereco" v-model="fm.endereco"></td>
          </tr>
          <tr>
            <th>CIDADE</th>
            <td><input type="text" name="cidade" v-model="fm.cidade"></td>
          </tr>
          <tr>
            <th>ESTADO</th>
            <td><input type="text" name="estado" v-model="fm.estado"></td>
          </tr>
          <tr>
            <th>PAÍS</th>
            <td><input type="text" name="pais" v-model="fm.pais"></td>
          </tr>
          <tr>
            <th>Apresentação [about me]</th>
            <td><textarea name="about" id="about" cols="40" rows="5" v-model="fm.about"></textarea></td>
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
      fm: [],
      fmp: {
        pass: null,
        pass_new: null,
        pass_new_confirm: null
      }
    }
  },
  methods:{
    buscaDadosUser(){

      DATAUSER.buscaDadosUsuario()
      .then(r => {
        return this.fm = r.data.rr
      })
      .catch(err => {
        return alert(err)
      })

    },
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
  },
  mounted(){
    return this.buscaDadosUser()
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