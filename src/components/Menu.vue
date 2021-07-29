<template>
<div class="menu" v-if="mostraMenu" >
    <div class="content1">
        <h4>Olá {{mydd.nome}},</h4>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                
                <li><router-link to="/catalogo">Players [catalogo]</router-link></li>
                <li><router-link to="/play-accounts">My Play-accounts</router-link></li>
                <li><router-link to="/calc">Calculadora</router-link></li>
                <li><router-link to="/meusdiretos">Referrels Program</router-link></li>
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
    width: 15%;
    height: 100%;
    background-color: rgb(44, 44, 44);
    color: white;
    position: fixed;
    left: 0pt;
    top: 0pt;
}
.menu a, .menu a:visited{
  color: white;
  text-decoration: none;
}
.menu a:hover{
    text-decoration: underline;
}
.menu ul{
    padding: 0px;
}
</style>