import { http } from './api/config'

let TOKEN_USER = localStorage.getItem('access_token');
const authUserToken = 'Bearer '.concat(TOKEN_USER);

export default {
    buscaArquivosUsuario: async () => {
        const urlServer = '/filesuser';
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    },
    upFilesUser: async (files) => {

        const urlServer = '/upfilesuser';
        return await http.post(urlServer,files,{ headers: {
            authorization: authUserToken
        }})

    },
    delFileUser: async (idf) => {
        const urlServer = '/delfile/' + idf;
        return await http.delete(urlServer,{ headers: {
            authorization: authUserToken
        }})
    },
}