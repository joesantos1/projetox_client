import { http } from './api/config'

let TOKEN_USER = localStorage.getItem('access_token');
const authUserToken = 'Bearer '.concat(TOKEN_USER);

export default {
    authUser: async (dados) => {
        const urlServer = '/login'
        return await http.post(urlServer, dados)
    },
    authVerification: async () => {

        const urlServer = '/authvuser'
        try {
            if(TOKEN_USER){

                const v = await http.get(urlServer, { headers: {
                    authorization: authUserToken
                }})

                if(v.data.loggin==true){
                    return true
                }else{
                    throw false
                }
                
            }
            
            throw false

        } catch (error) {
                 
                localStorage.removeItem('access_token')
                localStorage.removeItem('_user')
                
                return false;
        }
    }
}