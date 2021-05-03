import { http } from './api/config'

let TOKEN_USER = localStorage.getItem('access_token');
const authUserToken = 'Bearer '.concat(TOKEN_USER);

export default {
    cadastraUsuario: async (dados) => {
        const urlServer = '/cadastro';
        return await http.post(urlServer,dados,{ headers: {
            authorization: authUserToken
        }})
    },
    atualizaDadosUsuario: async (dados) => {
        const urlServer = '/updmeusdados';
        return await http.put(urlServer,dados,{ headers: {
            authorization: authUserToken
        }})
    },
    atualizaSenhaUsuario: async (dados) => {
        const urlServer = '/updminhasenha';
        return await http.put(urlServer,dados,{ headers: {
            authorization: authUserToken
        }})
    },
}