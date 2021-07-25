import { http } from './api/config'

let TOKEN_USER = localStorage.getItem('access_token');
const authUserToken = 'Bearer '.concat(TOKEN_USER);

export default {
    buscaTodasPAsQuotas: async () => {
        const urlServer = '/buscapasquotas';
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    },
    buscaTodasMinhasVendas: async () => {
        const urlServer = '/buscaminhasvendas';
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    },
    buscaDadosPAcompra: async (idpa) => {
        const urlServer = '/buscapacompra/' + idpa;
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    },
    verificaOrderBuyPA: async (dados) => {
        const urlServer = '/verificaorderbuy';
        return await http.post(urlServer,dados,{ headers: {
            authorization: authUserToken
        }})
    }
}