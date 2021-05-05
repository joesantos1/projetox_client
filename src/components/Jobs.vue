<template>
  <div class="content-u">
      <div class="content1">
          <h3>Catálogo de Trabalhos</h3>
            <p>{{dj.length == undefined ? 0 : dj.length}} registros encontratos.</p>
            <div class="jobs">
                <ul v-for="v of dj" :key="v.id">
                    <li><router-link :to="'/job/'+v.idjobs">{{v.jobs_titulo}}</router-link></li>
                    <li>Temperatura: {{v.jobs_temp}}</li>
                    <li>Comissão: até R$ {{v.jobs_comissao}}</li>
                    <li>Pontos: {{v.jobs_pontos}}</li>
                    <li>Começa em: {{v.jobs_start}}</li>
                    <li>Encerra em: {{v.jobs_validade}}</li>
                    <li><i>Add em: {{(fd.formatData(v.createdAt) )}}</i></li>
                    <li><i>Atualizado em: {{fd.formatData(v.updatedAt)}}</i></li>
                    <li><router-link :to="'/job/'+v.idjobs">Mais informações</router-link></li>
                    <li><router-link to="/inscricaocandidato">PARTICIPAR</router-link> </li>
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
            .cath(err => {
                return alert(err)
            })

        }
    },
    mounted(){
        return this.buscaJobs();
    }

}
</script>

<style>

</style>