<template>
  <div id="app">
    <MENU />
    <div class="content-u">
      <router-view/>
    </div>
    
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
  padding: 5px 15px;
  background-color: white;
  border: 1px solid grey;
}
table{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
}
.content-user, .content-u{
  position: absolute;
  left: 15%;
  width: 85%;
  height: auto;
}
.content1{
  margin: 20px;
}
.tb1{
  margin: 10px 0px;
}
.tb1 th{
  background-color: #2c3e50;
  color: white;
}
.tb1 th, .tb1 td{
  border: 1px solid rgb(216, 216, 216);
}

</style>
