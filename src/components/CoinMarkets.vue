<template>
  <div class="coin-market"><h3> Últimos Preços e variações(%)(24h): </h3>
      <div class="markets">
              
      <ul v-for="(v,key) in coin" :key="v.id">
          <li><img :src="require('@/assets/'+key+'.png')" :alt="key" width="35px"></li>
          <li> <b v-html="UTILS.vCoin(key)"></b></li>
          <li v-if="curr=='usd'">U$ {{new Intl.NumberFormat('pt-BR').format(v.usd) }} <span v-html="UTILS.vCoinLastChange(v.usd_24h_change) "></span></li>
          <li v-if="curr=='brl'">R$ {{new Intl.NumberFormat('pt-BR').format(v.brl)}} <span v-html="UTILS.vCoinLastChange(v.brl_24h_change) "></span></li>
      </ul>
        
      </div>
      
    
      <div class="calc" v-if="dashview==0">
          <table class="tb1">
              <tr>
                  <th>Account [name] (*)</th>
                  <th>Account $[Amount buy]</th>
                  <th>Account [currency buy]</th>
              </tr>
              <tr>
                <td><input type="text" name="name" v-model="cc.name"></td>
                <td><input type="text" name="price" v-model="cc.price"></td>
                <td>
                    <select name="price" id="" v-model="cc.currency">
                        <option v-for="(v,key) in AllCoins" :key="v.id" :value="key">{{v}}</option>
                    </select>
                </td>
                
                
              </tr>
              <tr>
                  <th>Points [p/ day] (*)</th>
                  <th>Points = $? (*)</th>
                  <th>Share (%) Player (0 a 100)</th>
              </tr>
              <tr>
                  <td>
                    <input type="text" v-model="cc.points" v-mask="'####'">
                </td>
                <td>
                    <select name="price" id="" v-model="cc.points_currency">
                        <option v-for="(v,key) in AllCoins" :key="v.id" :value="key">{{v}}</option>
                    </select>
                </td>
                <td>
                    <input type="text" v-model="cc.share" v-mask="'##'">
                </td>
                
              </tr>
              <tr>
                  <th colspan="4">Show Rules</th>
                  
              </tr>
              <tr>
                  <td colspan="4">
                      <b>Filtro: </b>
                    <input type="checkbox" name="ow" id="ow" v-model="cc.ow"><label for="ow"> Owner rev.</label> 
                    <input type="checkbox" name="pl" id="pl" v-model="cc.pl"><label for="pl">Player rev.</label> 
                  </td>
              </tr>
              <tr>
                  <td colspan="4">
                    <button @click="simulaCalc()">SIMULAR</button>
                </td>
              </tr>
          </table>
          <p></p>
          <p style="font-size:12px">
              (*) Campos obrigatórios. <br>
              (**) Os valores apresentados abaixo representa mera simulação de calculos realizados com base no preço atual de mercado das moedas selecionas, não garantindo assim nenhum rendimento ou retorno futuro; <br>
              <i>Lendenda: P = Points | d = Day | w = Week | m = Mounth | y = Year | Pb = Payback | O = Owner | P = Player </i>
              </p>
          <table class="tb1">
              <tr>
                  <th rowspan="2">Account</th>
                  <th rowspan="2">Cost $</th>
                  <th colspan="4">Points</th>
                  <th colspan="4">Pay-back</th>
                  <td></td>
              </tr>
              <tr>
                  <th>D</th>
                  <th>W</th>
                  <th>M</th>
                  <th>Y</th>
                  <th>D</th>
                  <th>W</th>
                  <th>M</th>
                  <th>Y</th>
                  <td></td>
              </tr>
              <tr v-if="total>0">
                  <td align="right">OWNER R. TOTAL</td>
                  <td align="center">{{fn(total)}}  </td>
                  <td>{{fn(tot1.d_o)}}  </td>
                  <td>{{fn(tot1.w_o)}}  </td>
                  <td>{{fn(tot1.m_o)}}</td>
                  <td>{{fn(tot1.y_o)}} </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr v-if="totplayer">
                  <td align="right">PLAYER R. TOTAL</td>
                  <td></td>
                  <td>{{fn(tot1.d_p)}}  </td>
                  <td>{{fn(tot1.w_p)}}  </td>
                  <td>{{fn(tot1.m_p)}}</td>
                  <td>{{fn(tot1.y_p)}} </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr v-for="(v,index) of ccr" :key="v.id">
                  <td>{{v.name}} <br>
                  <b>O: </b>{{v.so}} <br>
                  <b>P: </b>{{v.sp}}
                  </td>
                    <td>
                      {{v.price}} <br>
                        <span>
                            {{v.c.price ? fn(v.c.price) : null}}
                        </span>
                    </td>
                <td>
                    {{v.p1.d}} <br>
                    
                    <span v-if="v.c.d">U$ {{fn(v.c.d)}} <br></span>
                    <span v-if="v.c.d_o"><b>O:</b> {{fn(v.c.d_o)}} <br></span>
                    <span v-if="v.c.d_p"><b>P:</b> {{fn(v.c.d_p)}} <br></span>
                    
                </td>
                <td>
                    {{v.p1.w}} <br>
                    
                    <span v-if="v.c.w">{{fn(v.c.w)}} <br></span>
                    <span v-if="v.c.w_o"><b>O:</b> {{fn(v.c.w_o)}} <br></span>
                    <span v-if="v.c.w_p"><b>P:</b> {{fn(v.c.w_p)}} <br></span>
                    
                </td>
                <td>
                    {{v.p1.m}} <br>
                    
                    <span v-if="v.c.m">{{fn(v.c.m)}} <br></span>
                    <span v-if="v.c.m_o"><b>O: </b> {{fn(v.c.m_o)}} <br></span>
                    <span v-if="v.c.m_p"><b>P: </b> {{fn(v.c.m_p)}} <br></span>
                    
                </td>
                <td>
                    {{v.p1.y}} <br>
                    
                    <span v-if="v.c.y">{{fn(v.c.y)}} <br></span>
                    <span v-if="v.c.y_o"><b>O:</b> {{fn(v.c.y_o)}} <br></span>
                    <span v-if="v.c.y_p"><b>P:</b> {{fn(v.c.y_p)}} <br></span>
                    
                </td>
                <td>
                    {{v.pb.d ? v.pb.d.toFixed(1) : 0}}
                </td>
                <td>
                    {{v.pb.w ? v.pb.w.toFixed(1) : 0}}
                </td>
                <td>
                    {{v.pb.m ? v.pb.m.toFixed(1) : 0}}
                </td>
                <td>
                    {{v.pb.y ? v.pb.y.toFixed(1) : 0}}
                </td>
                <td><button @click="removeReg(index)">X</button></td>
              </tr>
          </table>
      </div>
  </div>
</template>

<script>
import COINS from '../services/coingecko'
import UTILS from '@/utils/utils'
export default {
    props: ['dashview'],
    data(){
        return{
            coin: [],
            cc: [],
            ccr: [],
            UTILS,
            AllCoins: UTILS.CoinsAndCriptos(),
            total: 0,
            totplayer: false,
            tot1: [],
            curr: localStorage.getItem('currency')
        }
    },
    methods: {
        buscaCoins(){
            COINS.buscaCoinPrice()
            .then(r => {
                localStorage.setItem('coinmarket',JSON.stringify(r.data))
                return this.coin = r.data
            })
            .catch(err => { return alert(err)})
        },
        simulaCalc(){
            let {name, price, currency, points, points_currency, share, ow, pl} = this.cc

            if(name==null || points==null || points_currency==null){
                return alert('Por favor, preencha todos os campos obrigatórios.')
            }

            price = price ? price.replace(',','.') : 1
            let share_p = parseFloat(share / 100)
            let share_o = (1 - share_p)

            let co
            
            if(this.curr == 'usd') co = this.coin[points_currency].usd
            if(this.curr == 'brl') co = this.coin[points_currency].brl

            var d = 1
            let w = 7
            let m = 30
            let y = 365

            var c = []
            var p1 = []
            var pb = []

            p1['d'] = (points * d)
            p1['w'] = (points * w)
            p1['m'] = (points * m)
            p1['y'] = (points * y)

            if(co){

                c['price'] = (price * this.coin[currency][this.curr])
                c['d'] = (p1['d'] * co)  
                c['w'] = (p1['w'] * co)
                c['m'] = (p1['m'] * co)
                c['y'] = (p1['y'] * co)
                c['style'] = 'U$ '

                if(ow){

                    c['d_o'] = (c['d'] * share_o)
                    pb['d'] = (c['price'] / c['d_o'])
                    c['w_o'] = (c['w'] * share_o)
                    pb['w'] = (c['price'] / c['w_o'])
                    c['m_o'] = (c['m'] * share_o)
                    pb['m'] = (c['price'] / c['m_o'])
                    c['y_o'] = (c['y'] * share_o)
                    pb['y'] = (c['price'] / c['y_o'])
                }

                if(pl){
                                  
                    c['d_p'] = (c['d'] * share_p)      
                    c['w_p'] = (c['w'] * share_p)
                    c['m_p'] = (c['m'] * share_p)
                    c['y_p'] = (c['y'] * share_p)
                    this.totplayer = true
                }

            }
            
            for(var v in c){
                
                let vv = c[v]

                if(v=='price') { this.total += vv }

                if(this.tot1[v]){
                    this.tot1[v] += vv
                }else{
                    this.tot1[v] = vv
                }

            }

            var res = {
                name,
                so: (share_o*100) + '%',
                sp: (share_p*100) + '%',
                price,
                p1,
                c,
                pb
            }

            this.ccr.push(res);
            return

        },
        removeReg(id){

            let h = this.ccr[id].c
            let t1 = this.tot1

            if(h){
                for(var v in t1){
                    this.tot1[v] = t1[v] - h[v]
                }
            }

            this.total = (this.total - h.price)

            this.ccr.splice(id,1)

            if(!this.ccr[0].c.d_p){this.totplayer = false}

            return
        },
        fn(v){
            if(!v) return
            let cifra
            if(this.curr=='brl') cifra='R$ ' 
            if(this.curr=='usd') cifra='U$ '
            let vv = v.toFixed(2)
            vv = new Intl.NumberFormat('pt-BR').format(vv)
            return cifra + vv
        }
    },
    mounted(){
        return this.buscaCoins()
    }
}
</script>

<style>
.calc,.coin-market{
    float: left;
    width: 100%;
    font-size: 0.9em;
}
.coin-market{
    border-radius: 10px;
    background: rgb(241, 241, 241);
    padding: 30px 10px;
    margin-bottom: 20px;
}
.coin-market h3{
    margin: 10px;
}
.markets{
    display: flex;
    width: 100%;
    justify-content: space-between;
}
.markets ul{
    width: 220px;
    height: 80px;
    padding: 1px 10px;
    margin: 10px;
    list-style: none;
    background: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-shadow: 10px 5px 5px rgb(204, 204, 204);
}
.markets ul li{
    margin: 0px 3px;
}
.markets-child{
    width: 100%;
}
.calc{
    margin: 20px 0px;
}
.calc td{
    text-align: center;
    border: 1px solid rgb(231, 231, 231);
    background: white;
}
.calc td span{
    font-size: 12px;
}
@media (max-width: 1250px){
    .markets{
        flex-direction: column;
    }
    .markets ul{
        width: 88%;
        height: 40px;
        margin: 5px;
    }
    .coin-market{
        padding: 20px 0px;
    }
}
@media (max-width: 550px){
    .markets{
        flex-direction: column;
    }
    .markets ul{
        width: 88%;
        height: 40px;
        margin: 5px;
    }
    .coin-market{
        padding: 20px 0px;
    }
}
</style>