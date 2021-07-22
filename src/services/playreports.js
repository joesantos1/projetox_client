import { http } from './api/config'

let TOKEN_USER = localStorage.getItem('access_token');
const authUserToken = 'Bearer '.concat(TOKEN_USER);

export default {
    buscaTodosPlayReports: async (idag) => {
        const urlServer = '/buscatodosplayreports/' + idag;
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    },
    novoPlayReport: async (dados) => {
        const urlServer = '/novoplayreport/';
        return await http.post(urlServer,dados,{ headers: {
            authorization: authUserToken
        }})
    },
    atualizaPlayReport: async (dados) => {
        const urlServer = '/updplayreports';
        return await http.put(urlServer,dados,{ headers: {
            authorization: authUserToken
        }})
    },
    buscaTodosPlayReportsPlayer: async (idp) => {
        const urlServer = '/todosreportsplayer/' + idp;
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    }
}