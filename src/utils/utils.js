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
    }
}