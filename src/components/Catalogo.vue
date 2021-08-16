<template>
  <div :class="dashview ? '' : 'content1'">
      <div class="catalogo">
        
        <table class="tb1">
            <tr>
                <th colspan="7"><h3><span v-if="!dashview"><router-link to="/">Dashboard</router-link> | </span>Catálogo de Players | {{PL.length}} players cadastrados. <router-link to="/catalogo" v-if="dashview">ver completo</router-link></h3></th>
            </tr>
            <tr>
                <th>Player</th>
                <th>Status</th>
                <th>País</th>
                <th>Total XP</th>
                <th>Data do cadastro</th>
                <th></th>
            </tr>
            <tr v-for="v of PL" :key="v.id">
                <td>
                    <router-link :to="'/player/' + v.idusuarios">
                    <span class="player-parent">
                        <span class="foto-user-list" v-if="v.foto_url" v-bind:style="{ backgroundImage: url(v.foto_url) }"></span><span class="foto-user-list no-foto" v-else ></span> <span>{{v.nome + ' #' + v.idusuarios}}</span>
                    </span>
                
                </router-link> </td>
                <td align="center">{{UTILS.vStatusPlayer(v.status) }}</td>
                <td>{{v.pais}}</td>
                <td align="center">{{v.total_xp}}</td>
                <td>{{UTILS.formatData(v.createdAt)}}</td>
                <td><span v-if="v.idusuarios != IDU.iduser"><router-link :to="'/fazerproposta/' + v.idusuarios"><img src="@/assets/contract.png" alt="Fazer proposta de contrato" class="img-contrato"></router-link></span>  </td>
            </tr>
        </table>
      </div>
    <div class="catalogo-rank">
        <RANKING />
    </div>
  </div>
</template>

<script>
import ALLUSERS from '../services/dataUser'
import UTILS from '@/utils/utils'
import RANKING from '@/components/Ranking.vue'

export default {
    props: ['dashview'],
    components:{
        RANKING
    },
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
        },
        url(f){
            return 'url("'+f+'")'
        }
    },
    created(){
        return this.buscaPlayers()
    }
}
</script>

<style>
.catalogo{
    float: left;
    width: 65%;
    font-size: 14px;
}

.catalogo-rank{
    float: left;
    width: 33%;
    margin-left: 2%;
}
.img-contrato{
    width: 30px;
}

@media (max-width: 550px){
    .catalogo, .catalogo-rank{
        width: 100%;
        margin-left: 0px;
    }
    .img-contrato{
        width: 15px;
    }

}
</style>