import { http } from './api/config'

let TOKEN_USER = localStorage.getItem('access_token');
const authUserToken = 'Bearer '.concat(TOKEN_USER);

export default {
    buscaTodosJobs: async () => {
        const urlServer = '/buscajobs';
        return await http.get(urlServer,{ headers: {
            authorization: authUserToken
        }})
    }
}