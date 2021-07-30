<template>
  <div class="coin-market">
      <div class="markets">
        <h3>Últimos Preços e variações(%)(24h): </h3>
      <ul v-for="(v,key) in coin" :key="v.id">
          <li> <b>{{UTILS.vCoin(key)}}</b></li>
          <li>U$ {{new Intl.NumberFormat('pt-BR').format(v.usd) }} <span v-html="UTILS.vCoinLastChange(v.usd_24h_change) "></span></li>
          <li>R$ {{new Intl.NumberFormat('pt-BR').format(v.brl)}} <span v-html="UTILS.vCoinLastChange(v.brl_24h_change) "></span></li>
      </ul>
      </div>
      
    
      <div class="calc" v-if="dashview==0">
          <table class="tb1">
              <tr>
                  <th>Account [name] (*)</th>
                  <th>Account $[Amount]</th>
                  <th>Account [currency]</th>
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
                    <input type="text" v-model="cc.points">
                </td>
                <td>
                    <select name="price" id="" v-model="cc.points_currency">
                        <option v-for="(v,key) in AllCoins" :key="v.id" :value="key">{{v}}</option>
                    </select>
                </td>
                <td>
                    <input type="text" v-model="cc.share">
                </td>
                
              </tr>
              <tr>
                  <th colspan="4">Show Rules</th>
                  
              </tr>
              <tr>
                  <td colspan="4">
                
                    <input type="checkbox" name="usd" v-model="cc.usd" id="usd"><label for="usd">USD [U$]</label> <input type="checkbox" name="brl" id="brl" v-model="cc.brl"><label for="brl">BRL [R$]</label> 
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
              (**) Os valores apresentados abaixo representa mera simulação de calculos realizados com base no preço atual de mercado das moedas selecionas, não garantindo assim nenhum rendimento ou retorno futuro;
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
              <tr v-if="total_usd>0">
                  <td align="right">OWNER R. TOTAL [U$]</td>
                  <td align="center">U$ {{fn(total_usd)}}  </td>
                  <td>U$ {{fn(tot1.d_o)}}  </td>
                  <td>U$ {{fn(tot1.w_o)}}  </td>
                  <td>U$ {{fn(tot1.m_o)}}</td>
                  <td>U$ {{fn(tot1.y_o)}} </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr v-if="total_brl>0">
                  <td>OWNER R. TOTAL [R$]</td>
                  <td>R$ {{fn(total_brl)}}</td>
                  <td>R$ {{fn(tot2.d_o)}}</td>
                  <td>R$ {{fn(tot2.w_o)}}</td>
                  <td>R$ {{fn(tot2.m_o)}}</td>
                  <td>R$ {{fn(tot2.y_o)}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr v-if="tusd_p">
                  <td align="right">PLAYER R. TOTAL [U$]</td>
                  <td></td>
                  <td>U$ {{fn(tot1.d_p)}}  </td>
                  <td>U$ {{fn(tot1.w_p)}}  </td>
                  <td>U$ {{fn(tot1.m_p)}}</td>
                  <td>U$ {{fn(tot1.y_p)}} </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr v-if="tbrl_p">
                  <td>PLAYER R. TOTAL [R$]</td>
                  <td></td>
                  <td>R$ {{fn(tot2.d_p)}}</td>
                  <td>R$ {{fn(tot2.w_p)}}</td>
                  <td>R$ {{fn(tot2.m_p)}}</td>
                  <td>R$ {{fn(tot2.y_p)}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr v-for="(v,index) of ccr" :key="v.id">
                  <td>{{v.name}}</td>
                    <td>
                      {{v.price}} <br>
                        <span>
                            {{v.c.price ? 'U$ ' + fn(v.c.price) : null}} <br>
                            {{v.c2.price ? 'R$ ' + fn(v.c2.price) : null}}
                        </span>
                    </td>
                <td>
                    {{v.p1.d}} <br>
                    
                    <span v-if="v.c.d">U$ {{fn(v.c.d)}} <br></span>
                    <span v-if="v.c2.d">R$ {{fn(v.c2.d)}} <br></span>
                    <span v-if="v.c.d_o"><b>O: U$ </b> {{fn(v.c.d_o)}} <br></span>
                    <span v-if="v.c.d_p"><b>P: U$ </b> {{fn(v.c.d_p)}} <br></span>
                    <span v-if="v.c2.d_o"><b>O: R$</b> {{fn(v.c2.d_o)}} <br></span>
                    <span v-if="v.c2.d_p"><b>P: R$</b> {{fn(v.c2.d_p)}} <br></span>
                    
                </td>
                <td>
                    {{v.p1.w}} <br>
                    
                    <span v-if="v.c.w">U$ {{fn(v.c.w)}} <br></span>
                    <span v-if="v.c2.w">R$ {{fn(v.c2.w)}} <br></span>
                    <span v-if="v.c.w_o"><b>O: U$</b> {{fn(v.c.w_o)}} <br></span>
                    <span v-if="v.c.w_p"><b>P: U$</b> {{fn(v.c.w_p)}} <br></span>
                    <span v-if="v.c2.w_o"><b>O: R$</b> {{fn(v.c2.w_o)}} <br></span>
                    <span v-if="v.c2.w_p"><b>P: R$</b> {{fn(v.c2.w_p)}} <br></span>
                    
                </td>
                <td>
                    {{v.p1.m}} <br>
                    
                    <span v-if="v.c.m">U$ {{fn(v.c.m)}} <br></span>
                    <span v-if="v.c2.m">R$ {{fn(v.c2.m)}} <br></span>
                    <span v-if="v.c.m_o"><b>O: U$</b> {{fn(v.c.m_o)}} <br></span>
                    <span v-if="v.c.m_p"><b>P: U$</b> {{fn(v.c.m_p)}} <br></span>
                    <span v-if="v.c2.m_o"><b>O: R$</b> {{fn(v.c2.m_o)}} <br></span>
                    <span v-if="v.c2.m_p"><b>P: R$</b> {{fn(v.c2.m_p)}} <br></span>
                    
                </td>
                <td>
                    {{v.p1.y}} <br>
                    
                    <span v-if="v.c.y">U$ {{fn(v.c.y)}} <br></span>
                    <span v-if="v.c2.y">R$ {{fn(v.c2.y)}} <br></span>
                    <span v-if="v.c.y_o"><b>O: U$</b> {{fn(v.c.y_o)}} <br></span>
                    <span v-if="v.c.y_p"><b>P: U$</b> {{fn(v.c.y_p)}} <br></span>
                    <span v-if="v.c2.y_o"><b>O: R$</b> {{fn(v.c2.y_o)}} <br></span>
                    <span v-if="v.c2.y_p"><b>P: R$</b> {{fn(v.c2.y_p)}} <br></span>
                    
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
            total_brl: 0,
            total_usd: 0,
            tusd_p: false,
            tbrl_p: false,
            tot1: [],
            tot2: []
        }
    },
    methods: {
        buscaCoins(){
            COINS.buscaCoinPrice()
            .then(r => {
                return this.coin = r.data
            })
            .catch(err => { return alert(err)})
        },
        simulaCalc(){
            let {name, price, currency, points, usd, brl, points_currency, share, ow, pl} = this.cc

            if(name==null || points==null || points_currency==null){
                return alert('Por favor, preencha todos os campos obrigatórios.')
            }

            price = price ? price.replace(',','.') : 1
            let share_p = parseFloat(share / 100)
            let share_o = (1 - share_p)
            
            let c_usd = this.coin[points_currency].usd
            let c_brl = this.coin[points_currency].brl
            var d = 1
            let w = 7
            let m = 30
            let y = 365

            var c = []
            var c2 = []
            var p1 = []
            var pb = []

            p1['d'] = (points * d)
            p1['w'] = (points * w)
            p1['m'] = (points * m)
            p1['y'] = (points * y)

            if(usd){
                c['price'] = price ? (price * this.coin[currency].usd) : 0
                c['d'] = (p1['d'] * c_usd)  
                c['w'] = (p1['w'] * c_usd)
                c['m'] = (p1['m'] * c_usd)
                c['y'] = (p1['y'] * c_usd)
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
                    this.tusd_p = true
                }

            }
            if(brl){
                c2['price'] = price ? (price * this.coin[currency].brl) : 0
                c2['d'] = (p1['d'] * c_brl)  
                c2['w'] = (p1['w'] * c_brl)
                c2['m'] = (p1['m'] * c_brl)
                c2['y'] = (p1['y'] * c_brl)
                c2['style'] = 'R$ '

                if(ow){

                    c2['d_o'] = (c2['d'] * share_o)
                    
                    c2['w_o'] = (c2['w'] * share_o)
                    
                    c2['m_o'] = (c2['m'] * share_o)
                    
                    c2['y_o'] = (c2['y'] * share_o)
                    

                        pb['d'] = (c2['price'] / c2['d_o'])
                        pb['w'] = (c2['price'] / c2['w_o'])
                        pb['m'] = (c2['price'] / c2['m_o'])
                        pb['y'] = (c2['price'] / c2['y_o'])
                
                }

                if(pl){
                                  
                    c2['d_p'] = (c2['d'] * share_p)      
                    c2['w_p'] = (c2['w'] * share_p)
                    c2['m_p'] = (c2['m'] * share_p)
                    c2['y_p'] = (c2['y'] * share_p)
                    this.tbrl_p = true
                }
            } 
            

            for(var v in c){
                
                let vv = c[v]

                if(v=='price') { this.total_usd += vv }

                if(this.tot1[v]){
                    this.tot1[v] += vv
                }else{
                    this.tot1[v] = vv
                }

            }

            for(var v in c2){
                
                let tt = c2[v]

                if(v=='price') { this.total_brl += tt }

                if(this.tot2[v]){
                    this.tot2[v] += tt
                }else{
                    this.tot2[v] = tt
                }
                
            }

            var res = {
                name,
                price,
                p1,
                c,
                c2,
                pb
            }

            return this.ccr.push(res);

        },
        removeReg(id){

            let h = this.ccr[id].c
            let h2 = this.ccr[id].c2
            let t1 = this.tot1
            let t2 = this.tot2

            if(h){
                for(var v in t1){
                    this.tot1[v] = t1[v] - h[v]
                }
            }
            if(h2){
                for(var v in t2){
                    this.tot2[v] = t2[v] - h2[v]
                }
            }

            this.total_brl = (this.total_brl - h2.price)
            this.total_usd = (this.total_usd - h.price)

            this.ccr.splice(id,1)

            if(!this.ccr[0].c.d_p){this.tusd_p = false}
            if(!this.ccr[0].c2.d_p){this.tbrl_p = false}

            return
        },
        fn(v){
            if(!v) return
            let vv = v.toFixed(2)
            return new Intl.NumberFormat('pt-BR').format(vv)
        }
    },
    mounted(){
        return this.buscaCoins()
    }
}
</script>

<style>
.coin-market{
    float: left;
    width: 100%;
    border-radius: 10px;
    background: rgb(236, 236, 236);
    align-items: center;
}
.coin-market ul{
    padding: 1px 10px;
    margin: 5px 10px;
    list-style: none;
    float: left;
    background: white;
    border-radius: 10px;
}
.calc,.coin-market{
    float: left;
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
</style>