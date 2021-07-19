<template>
<div class="menu" v-if="mostraMenu" >
    <div class="content1">
        <h4>Olá {{mydd.nome}},</h4>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/catalogo">Catálogo de Players</router-link></li>
                <li><router-link to="/redeunilevel">Referrels Program</router-link></li>
                <li><router-link to="/meusdados">Meus dados</router-link></li>
                <li><router-link to="/logout">Sair</router-link></li>
            </ul>
    </div>
</div>
  
</template>

<script>
export default {
    data(){
        return {
            mostraMenu: true,
            mydd: JSON.parse(localStorage.getItem('_user'))
        }
    },
    methods:{
        verificaLogin(){
            if(!localStorage.getItem('access_token')){
                this.mostraMenu = false
            }
        }
    },
    created(){
        return this.verificaLogin()
    }

}
</script>

<style>
.menu{
  float: left;
  width: 20%;
  height: 500px;
  background-color: rgb(44, 44, 44);
  color: white;
}
.menu a, .menu a:visited{
  color: white;
  text-decoration: none;
}
.menu a:hover{
    text-decoration: underline;
}
</style>