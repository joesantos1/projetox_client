<template>
  <div class="catalogo">
        <h3>Catálogo de Players | players cadastrados.</h3>
        <table class="tb1">
            <tr>
                <th>Player</th>
                <th>Status</th>
                <th>País</th>
                <th>Games (Exp)</th>
                <th>Ganhos Acumulados</th>
                <th>Data do cadastro</th>
                <th></th>
            </tr>
            <tr v-for="v of PL" :key="v.id">
                <td>{{v.nome}}</td>
                <td>{{UTILS.vStatusPlayer(v.status) }}</td>
                <td>{{v.pais}}</td>
                <td>{{UTILS.verGames(v.games)}}</td>
                <td>{{v.ganhosa}}</td>
                <td>{{UTILS.formatData(v.createdAt)}}</td>
                <td><span v-if="v.idusuarios != IDU.iduser"><router-link :to="'/fazerproposta/' + v.idusuarios">Contratar</router-link></span>  </td>
            </tr>
        </table>
  </div>
</template>

<script>
import ALLUSERS from '../services/dataUser'
import UTILS from '@/utils/utils'
export default {
    data(){
        return {
            PL: [],
            UTILS,
            IDU: JSON.parse(localStorage.getItem('_user'))
        }
    },
    methods:{
        buscaPlayers(){
            ALLUSERS.buscaTodosUsuarios()
            .then(r => {
                return this.PL = r.data.busca
            })
            .catch(err => {
                return alert(err)
            })
        }
    },
    mounted(){
        return this.buscaPlayers()
    }
}
</script>

<style>

</style>