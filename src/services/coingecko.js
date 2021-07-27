import { http } from './api/config'

export default {
    buscaCoinPrice: async () => {
        const urlServer = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Csmooth-love-potion%2Caxie-infinity&vs_currencies=usd%2Cbrl&include_24hr_change=true';
        return await http.get(urlServer)
    },
}