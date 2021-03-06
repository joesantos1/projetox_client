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
    timeConverter : (UNIX_timestamp,d) => {
        if(d>0){
            var a = new Date((UNIX_timestamp * 1000) + parseInt(d));
        }else{
            var a = new Date(UNIX_timestamp * 1000);
        }
        
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      },
    vStatusPlayAcc: (s) => {
        if(s==1) return 'Acordo enviado. Aguardando confirmação de proposta.'
        if(s==2) return 'Aguardando um novo acordo - <a href="/catalogo">Contratar player</a>'
        if(s==3) return '<span class="green">Contrato confirmado. Player selecionado.</span>'
        if(s==4) return 'Contrato cancelado.'
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
        if(v==4) return 'Contrato cancelado.'
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
    verQuotaCurrency: (v) => {
        if(v=='BTC') return 'Bitcoin (BTC)'
        if(v=='ETH') return 'Ethereum (ETH)'
        if(v=='USDT') return 'Dollar Tether (USDT)'
    },
    vStatusOrders: (v) => {
        if(v==1) return 'Pedido enviado. [pendente]'
        if(v==2) return 'Pedido cancelado.'
        if(v==3) return '<span class="green">Pedido confirmado. [compra realizada]</span>'
    },
    vCoin: (v) => {
        if(v=='bitcoin') return 'Bitcoin (BTC)'
        if(v=='ethereum') return 'Ethereum (ETH)'
        if(v=='smooth-love-potion') return 'Smooth Love Point (SLP)'
        if(v=='axie-infinity') return 'Axie Infinity (AXS)'
        if(v=='tether') return 'US Dollar Tether (USDT)'
    },
    vCoinLastChange: (v) => {
        if(v>0) return '<span class="green">'+v.toFixed(2)+'%</span>'
        if(v<0) return '<span class="red">'+v.toFixed(2)+'%</span>'
    },
    CoinsAndCriptos: () => {
        let v = {
            tether: 'US Dollar Tether (USDT)',
            bitcoin: 'Bitcoin (BTC)',
            ethereum: 'Ethereum (ETH)',
            'smooth-love-potion': 'Smooth Love Points (SLP)',
            'axie-infinity': 'Axie Infinity (AXS)'
        }
        return v
    },
    priceCoin: (v,coin) => {

        if(v==0 || v==undefined) return ''

        let cota = JSON.parse(localStorage.getItem('coinmarket'))
        let curr = localStorage.getItem('currency')

        let cifra

        if(curr=='usd') cifra = 'U$ '
        if(curr=='brl') cifra = 'R$ '

        let c = cota[coin][curr]
        let calc = (v*c).toFixed(2)
        let c_price = new Intl.NumberFormat('pt-BR').format(calc)
        return cifra + c_price
        
    },
    url(f){
        return 'url("'+f+'")'
    }
}