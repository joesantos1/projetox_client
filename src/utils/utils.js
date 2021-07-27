export default {
    formatData: (data) => {

        if(!data){
            return '...'
        }

        var d = data.split('T')
        var d1 = d[0].split('-')
        var h1 = d[1].split(':')
        var ha = h1[0] >= 3 ? h1[0] - 3 : parseInt(h1[0]) + 24 - 3
        var hh = ha < 10 ? '0' + ha : ha
        var r = d1[2] + '/' + d1[1] + '/' + '2021' + ' às ' + hh + 'h' + h1[1]

        return r;
    },
    vStatusPlayAcc: (s) => {
        if(s==1){
            return 'Acordo enviado. Aguardando confirmação de proposta.'
        }
        if(s==2){
            return 'Aguardando um novo acordo - <a href="/catalogo">Contratar player</a>'
        }
        if(s==3){
            return '<span class="green">Contrato confirmado. Player selecionado.</span>'
        }
    },
    vStatusPlayAccMarket: (s) => {
        if(s==1) return 'Acordo enviado. Aguardando confirmação de proposta.'
        if(s==2) return 'Aguardando um novo acordo'
        if(s==3) return '<span class="green">Contrato confirmado. Player selecionado.</span>'
    },
    vMetaRecord: (v) => {
        if(v==1) return 'DIÁRIA';
        if(v==2) return 'MENSAL';
        if(v==3) return 'ANUAL';
    },
    vPaymentType: (v) => {
        if(v==1) return 'Cripto (Bitcoin | BTC)'
        if(v==2) return 'Cripto (Etherem | ETH)'
        if(v==3) return 'Cripto (Dólar Tether | USDT)'
        if(v==4) return 'Transferência Bancária (Dinheiro)'
    },
    vStatusAgreement: (v) => {
        if(v==1) return 'Proposta enviada. Aguardando confirmação.'
        if(v==2) return 'Proposta recusada.'
        if(v==3) return 'Proposta aceita. Contrato confirmado.'
    },
    vStatusPlayer: (s) => {
        if(s==1){
            return 'Sem contrato'
        }
        if(s==3) return 'Player contratado.'
    },
    verGames: (v) => {
        if(!v) return
       var vv = v.split(',')
       var vvv = ''
       for(var x in vv){
           vvv += vv[x] + ' | '
       }
        return vvv
    },
    vStatusPlayReports: (v) => {
        if(v==1) return 'Não verificado.'
        if(v==2) return '<span class="green">Verificado.</span>'
    },
    verQuotaCurrency(v){
        if(v=='BTC') return 'Bitcoin (BTC)'
        if(v=='ETH') return 'Ethereum (ETH)'
        if(v=='USDT') return 'Dollar Tether (USDT)'
    },
    vStatusOrders(v){
        if(v==1) return 'Pedido enviado. [pendente]'
        if(v==2) return 'Pedido cancelado.'
        if(v==3) return '<span class="green">Pedido confirmado. [compra realizada]</span>'
    },
    vCoin(v){
        if(v=='bitcoin') return 'Bitcoin (BTC)'
        if(v=='ethereum') return 'Ethereum (ETH)'
        if(v=='smooth-love-potion') return 'Smooth Love Point (SLP)'
        if(v=='axie-infinity') return 'Axie Infinity (AXS)'
    },
    vCoinLastChange(v){
        if(v>0) return '<span class="green">'+v.toFixed(2)+'%</span>'
        if(v<0) return '<span class="red">'+v.toFixed(2)+'%</span>'
    }
}