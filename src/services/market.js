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
    buscaTodasMinhasVendas: async (idpa) => {
        const urlServer = '/buscaminhasvendas/' + idpa;
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
    },
    confirmaPagamentoVenda: async (dados) => {
        const urlServer = '/confirmapagamento';
        return await http.put(urlServer,dados,{ headers: {
            authorization: authUserToken
        }})
    },
    buscaTodosMeusPedidos: async () => {
        const urlServer = '/buscameuspedidos';
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    },
}