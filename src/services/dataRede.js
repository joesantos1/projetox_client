import { http } from './api/config'

let TOKEN_USER = localStorage.getItem('access_token');
const authUserToken = 'Bearer '.concat(TOKEN_USER);

export default {
    buscaMinhaRedeUnilevel: async () => {
        const urlServer = '/redeunilevel';
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    },
    buscaMeusIndicadosDiretos: async () => {
        const urlServer = '/rededireta';
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    }
}