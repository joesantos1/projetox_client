<template>
  <div :class="dashview ? '' : 'content1'">
        <h3><span v-if="!dashview"><router-link to="/">Dashboard</router-link> | </span>Catálogo de Players | {{PL.length}} players cadastrados. <router-link to="/catalogo" v-if="dashview">ver completo</router-link></h3>
        <table class="tb1">
            <tr>
                <th>Player</th>
                <th>Status</th>
                <th>País</th>
                <th>Games (Exp)</th>
                <th>Total XP</th>
                <th>Data do cadastro</th>
                <th></th>
            </tr>
            <tr v-for="v of PL" :key="v.id">
                <td>
                    <router-link :to="'/player/' + v.idusuarios">
                <span class="foto-user-list" v-if="v.foto_url"><img :src="v.foto_url" alt=""></span> <span>{{v.nome + ' #' + v.idusuarios}}</span></router-link> </td>
                <td>{{UTILS.vStatusPlayer(v.status) }}</td>
                <td>{{v.pais}}</td>
                <td>{{UTILS.verGames(v.games)}}</td>
                <td>{{v.total_xp}}</td>
                <td>{{UTILS.formatData(v.createdAt)}}</td>
                <td><span v-if="v.idusuarios != IDU.iduser"><router-link :to="'/fazerproposta/' + v.idusuarios">Fazer proposta</router-link></span>  </td>
            </tr>
        </table>
  </div>
</template>

<script>
import ALLUSERS from '../services/dataUser'
import UTILS from '@/utils/utils'
export default {
    props: ['dashview'],
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
    created(){
        return this.buscaPlayers()
    }
}
</script>

<style>
.tb1 span{
    display: inline;
}
.foto-user-list img{
    width: 35px;
    height: 35px;
    border-radius: 100%;
    display: inline;
}
</style>