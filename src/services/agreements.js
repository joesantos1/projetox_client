import { http } from './api/config'

let TOKEN_USER = localStorage.getItem('access_token');
const authUserToken = 'Bearer '.concat(TOKEN_USER);

export default {
    buscaDadosParaNovoAcordo: async (idplayer) => {
        const urlServer = '/datanewagreements/' + idplayer;
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    },
    buscaPropostasEAcordos: async (tipo) => {
        const urlServer = '/buscapropostas/' + tipo;
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    },
    enviarPropostaDeAcordo: async (dados) => {
        const urlServer = '/newagreement';
        return await http.post(urlServer,dados,{ headers: {
            authorization: authUserToken
        }})
    },
    enviaAceiteProposta: async (dados) => {
        const urlServer = '/aceitaproposta';
        return await http.put(urlServer,dados,{ headers: {
            authorization: authUserToken
        }})
    }
}