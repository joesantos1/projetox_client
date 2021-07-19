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
            return 'Aguardando um novo acordo'
        }
        if(s==3){
            return 'Contrato confirmado. Player selecionado.'
        }
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
            return 'Buscando novos contratos'
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
        if(v==2) return 'Verificado.'
    }
}