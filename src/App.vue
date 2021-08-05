<template>
  <div id="app">
    <MENU v-if="showMenu" />
    <div class="show-menu" v-if="verificaLogin">
      <img src="@/assets/menu.png" alt="Acessar menu" @click="showMenu==true ? showMenu=false : showMenu==false ? showMenu = true : showMenu">
    </div>
    
    <div class="content-u">
      <div class="set-currency">
        <select name="currency" id="currency" @change="setCurrency(1)" v-model="set_currency">
          <option value="usd" selected="selected">USD (U$)</option>
          <option value="brl">BRL (R$)</option>
        </select>
      </div>
      <router-view />
      <div class="rodape">
        <span>® Bookplyr.com - 2021 - version 1.0</span>
        
      </div>
    </div>
    
  </div>
</template>

<script>
import MENU from '@/components/Menu'
export default {
  name: 'App',
  components:{
    MENU
  },
  data(){
    return {
      set_currency: localStorage.getItem('currency') ? localStorage.getItem('currency') : 'usd',
      showMenu: true,
      verificaLogin: localStorage.getItem('access_token')
    }
  },
  methods: {
    setCurrency(s){
      if(s==1){
        localStorage.setItem('currency',this.set_currency)
        return this.$router.go()
      }
      return localStorage.setItem('currency',this.set_currency)

    }
  },
  mounted(){
    return this.setCurrency(0)
  }
}
</script>

<style>
body{
  margin: 0px;
  font-size: 16px;
}
#app,textarea {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.errors{

    z-index: 1000;
    position: absolute;
    width: 100%;
    padding: 15px 0px;
    background-color: rgb(255 0 0);
    color: rgb(255 255 255);
    font-weight: bold;
    top: 0%;
    margin: 0%;
    text-align: center;
}
input, textarea, button, select{
  padding: 0.7em;
  background-color: white;
  border: 1px solid rgb(228, 228, 228);
  border-radius: 10px;
}
table{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
}
.show-menu{
  position: fixed;
  top: 1%;
  left: 1%;
  z-index: 1000;
}
.content-user, .content-u{
  position: absolute;
  width: 100%;
  height: auto;
}
.content1{
  margin: 25px 10px;
  width: 100%;
  float: left;
}
.tb1{
  margin: 10px 0px;
  border-radius: 1em;
  overflow: hidden;
  box-shadow: 6px 6px 10px rgb(235, 235, 235);
}
.tb1 td, .tb2 td{
  padding: 0.6em;
  border:1px solid rgb(238, 238, 238);
}
.tb1 tr:hover, .tb2 tr:hover{
  background: rgb(240, 240, 240);
}
.tb1 th, .tb2 th{
  background-color: #ececec;
  color: rgb(99, 99, 99);
}
.tb2 th{
  text-align: right;
  padding: 0.5em;
  width: 20%;
}
a,a:visited,a:valid,a:active{
  text-decoration: none;
  color: #2d5072;
}
a:hover{
  text-decoration:underline #212529;
}
a:hover, button:hover{
  cursor: pointer;
}
.green{
  background: rgb(2, 177, 2);
  color: white;
}
.red{
  background: rgb(177, 2, 2);
  color: white;
}
.red, .green{
  padding: 0px 5px;
  border-radius: 10px;
  display: inline-block;
}
.set-currency{
  position: absolute;
  top: 2%;
  left: 80%;
}
.price{
  font-size: 0.8em;
  background: rgb(73, 146, 255);
  color: white;
  padding: 0px 5px;
  border-radius: 20px;
  float: left;
}

.player-parent{
    display: flex;
    align-items: center;
}
.foto-user-list{
    margin-right: 0.5em;
}
.foto-user-list{
    width: 40px;
    height: 40px;
    float: left;
    background-size: 75px;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 100%;
    border: 3px solid #ffad17;
}
.rodape{
  width: 100%;
  text-align: center;
  padding: 1em 0em;
  float: left;
}

@media (max-width: 550px){
  body{
    font-size: 12px;
  }
  .foto-user-list{
    width: 20px;
    height: 20px;
    background-size: 40px;
  }
  .set-currency select{
    font-size: 0.6em;
  }
  .content1{
    width: 95%;
  }
  .tb1,.tb2{
    font-size: 9px;
  }
}
</style>
