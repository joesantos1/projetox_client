<template>
  <div id="app">
    <MENU />
    <router-view/>
  </div>
</template>

<script>
import MENU from '@/components/Menu'
export default {
  name: 'App',
  components:{
    MENU
  }
}
</script>

<style>
body{
  margin: 0px;
  font-size: 14px;
}
#app {
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
input, textarea, button{
  padding: 10px;
  background-color: white;
}
table{
  width: 100%;
}
.content-user{
  float: left;
  width: 80%;
}
.content1{
  margin: 20px;
}
</style>
