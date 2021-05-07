<template>
  <div class="content-u">
      <div class="content1">
          <h3>Catálogo de Trabalhos</h3>
            <p>{{dj.length == undefined ? 0 : dj.length}} registros encontratos.</p>
            <div class="jobs">
                <ul v-for="v of dj" :key="v.id">
                    <li><router-link :to="'/job/'+v.idjobs">{{v.titulo}}</router-link></li>
                    <li>Temperatura: {{v.temp}}</li>
                    <li>Comissão: até R$ {{v.comissao}}</li>
                    <li>Pontos: {{v.pontos}}</li>
                    <li>Começa em: {{v.start}}</li>
                    <li>Encerra em: {{v.validade}}</li>
                    <li><i>Add em: {{(fd.formatData(v.createdAt) )}}</i></li>
                    <li><i>Atualizado em: {{fd.formatData(v.updatedAt)}}</i></li>
                    <li><router-link :to="'/job/'+v.idjobs">Mais informações</router-link></li>
                    <li><a v-if="v.c_j_id!=v.idjobs" title="Se candidatar para trabalho" @click="seCandidatar(v.idjobs)">PARTICIPAR</a> <span v-if="v.c_j_id==v.idjobs">{{v.c_status==1 ? 'INCRITO PARA TRABALHO' : 'PEDIDO EM ANÁLISE'}}</span> </li>
                </ul>
            </div>            
      </div>
  </div>
</template>

<script>
import JOBS_DATA from '@/services/jobs'
import fd from '@/utils/utils'
export default {
    data(){
        return {
            dj: [],
            fd
        }
    },
    methods: {
        buscaJobs(){

            JOBS_DATA.buscaTodosJobs()
            .then(r => {
                return this.dj = r.data.jobs
            })
            .catch(err => {
                return alert(err)
            })

        },
        seCandidatar(idJob){

            JOBS_DATA.cadastrarCandidato(idJob)
            .then(r => {
                alert(r.data.msg)
                return this.$router.go()
            })
            .catch(err => {
                console.log(err);
                return alert('deu erro aqui')
            })
        }
    },
    mounted(){
        return this.buscaJobs()
    },
    watch:{
        $route(to, from){
           return this.buscaJobs()
        }
    }

}
</script>

<style>
.jobs a{
    cursor: pointer;
    color: green;
}
.jobs a:hover{
    text-decoration: underline;
}
</style>