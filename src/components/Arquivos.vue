<template>
  <div class="content-u">
      <div class="content1">
          <h4>Meus arquivos</h4>
          <form @submit.prevent="upFiles" enctype="multipart/form-data">
              <table>
                  <tr>
                      <th align="right">FAZER UPLOAD:</th>
                      <td><input type="file" name="file" ref="file" @change="onSelect"> <button type="submit">ENVIAR</button></td>
                  </tr>
              </table>
          </form>
          <hr>
          <p>{{da.length}} registros encontrados.</p>
          <table cellspacing="0px" class="files">
              <tr>
                  <th>NOME</th>
                  <th>FORMATO</th>
                  <th>TAMANHO</th>
                  <th>UPLOAD EM</th>
                  <td></td>
              </tr>
              <tr v-for="v of da" :key="v.id">
                  <td><a :href="v.url" title="" target="_blank">{{v.nome}}</a> </td>
                  <td align="center">{{v.formato}}</td>
                  <td>{{convertBites(v.tamanho)}}</td>
                  <td align="center">{{fd.formatData(v.createdAt)}}</td>
                  <td><button @click="deleteFile(v.idarquivos, v.arquivos_key)">Excluir</button></td>
              </tr>
          </table>
      </div>

  </div>
</template>

<script>
import DATA_FILES from '@/services/uploads'
import fd from '@/utils/utils'

export default {
    data(){
        return {
            da: [],
            fd,
            file: null,
            bt_upload:true
        }
    },
    methods: {
        buscaArquivos(){
            DATA_FILES.buscaArquivosUsuario()
            .then(r => {
                return this.da = r.data.arquivos
            })
            .catch(err => {
                return alert(err)
            })
        },
        convertBites(v){
            var r = v / 1024

            var arr = parseFloat(r.toFixed(2)) + ' KB'

            return arr
        },
        onSelect(){
            const file = this.$refs.file.files[0];
            this.file = file
        },
        upFiles(){

            if(this.file){

                this.bt_upload = false

                const formData = new FormData();
                formData.append('file', this.file);

                    DATA_FILES.upFilesUser(formData)
                    .then((r) => {
                        alert('Upload realizado com sucesso.')
                        return this.$router.go()
                    })
                    
            }else{
                
                return alert('Por favor, selecione um arquivo compatível.')
            }
            
        },
        deleteFile(id){
            var confirma = confirm('Tem certeza que deseja excluir este arquivo?')

            if(confirma){
                DATA_FILES.delFileUser(id)
                .then(() => {

                    return this.$router.go()
                })
                .catch(err => {
                    return alert(err)
                })
            }
        }
    },
    mounted(){
        this.buscaArquivos()
    }

}
</script>

<style>
.files button{
    padding: 1px 20px;
    cursor: pointer;
}
</style>