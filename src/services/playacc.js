import { http } from './api/config'

let TOKEN_USER = localStorage.getItem('access_token');
const authUserToken = 'Bearer '.concat(TOKEN_USER);

export default {
    buscaTodasPlayAcc: async () => {
        const urlServer = '/buscaplayacc';
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    },
    cadastraNovaPlayAcc: async (dados) => {
        const urlServer = '/cadastraplayacc';
        return await http.post(urlServer, dados, { headers: {
            authorization: authUserToken
        }})
    },
    buscaParaUpdPlayAcc: async (id) => {
        const urlServer = '/buscadadosplayacc/'+id;
        return await http.get(urlServer, { headers: {
            authorization: authUserToken
        }})
    },
    atualizaPlayAcc: async (dados) => {
        const urlServer = '/updplayacc';
        return await http.put(urlServer, dados, { headers: {
            authorization: authUserToken
        }})
    },
}