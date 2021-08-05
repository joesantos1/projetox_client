<template>
<div class="menu" v-if="mostraMenu" >
    <div class="content1">
        <h4><br><br> Olá {{mydd.nome}},</h4>
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
    width: 165px;
    height: 100%;
    background-color: rgb(190, 190, 190);
    color: rgb(87, 87, 87);
    position: fixed;
    left: 0pt;
    top: 0pt;
    z-index: 900;
}
.menu a, .menu a:visited{
  color: rgb(54, 54, 54);
  text-decoration: none;
  font-weight: bold;
}
.menu a:hover{
    text-decoration: underline;
}
.menu ul{
    padding: 0px;
    list-style: none;
}
.menu ul li{
    margin: 10px 0px;
}
</style>