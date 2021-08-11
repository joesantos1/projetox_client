<template>
  <div :class="dashview ? '': 'content1'">
        
        
        <table class="tb1" v-if="mpa.tt || mpa.tt > 0">
            <tr>
                <th colspan="6"><h3>My Play-Accounts Performance Report | Axie Infinity</h3> </th>
            </tr>
            <tr>
                <th>TOTAL INVESTED</th>
                <td>{{all.total_invested.toFixed(4)}} <span class="price">{{UTILS.priceCoin(all.total_invested,'ethereum')}}</span></td>
                <th>ROI (%)</th>
                <td>{{all.roi.toFixed(2)}}%</td>
                
            </tr>
            <tr>
                <th>ROI [1d] (%)</th>
                <td>{{all.roi_day.toFixed(2)}}%</td>
                <th>ROI [30d] (%)</th>
                <td>{{all.roi_month.toFixed(2)}}%</td>
            </tr>
            <tr>
                <th>SLP TOTAL</th>
                <td>{{all.total_slp}} <span class="price">{{UTILS.priceCoin(all.total_slp,'smooth-love-potion')}}</span></td>
                <th>SLP TOTAL [claimed]</th>
                <td>{{all.total_claimed}} <span class="price">{{UTILS.priceCoin(all.total_claimed,'smooth-love-potion')}}</span></td>
                
            </tr>
            <tr>
                <th>SLP Avg/Day</th>
                <td>{{all.total_slp_avg.toFixed(0)}} <span class="price">{{UTILS.priceCoin(all.total_slp_avg,'smooth-love-potion')}}</span></td>
                <th>Next Claim</th>
                <td>{{UTILS.timeConverter(all.next_claim,1209600000)}}</td>
                
            </tr>
            <tr>
                <th>Next Claim [account]</th>
                <td>{{all.next_claim_acc}}</td>
                <th>Next Claim [SLP]</th>
                <td>{{all.next_claim_slp}}<span class="price">{{UTILS.priceCoin(all.next_claim_slp,'smooth-love-potion')}}</span></td>
            </tr>
            <tr>
                <th>High Performance SLP p/day</th>
                <td>
                    <span style="display:flex;justify-content: space-between;">
                    <img src="@/assets/best.png" width="24px" alt=""> {{all.high_slp.toFixed(0)}} <span class="price">{{UTILS.priceCoin(all.high_slp,'smooth-love-potion')}}</span>
                    </span> </td>
                <th>Best Account | Player</th>
                <td v-html="all.high_acc"></td>
            </tr>
            <tr>
                <th>Low Performance SLP p/day</th>
                <td>
                    <span style="display:flex;justify-content: space-between;">
                    <img src="@/assets/down2.png" alt=""> {{all.low_slp.toFixed(0)}} <span class="price">{{UTILS.priceCoin(all.low_slp,'smooth-love-potion')}}</span>
                    </span>
                </td>
                <th>Lower Account | Player</th>
                <td v-html="all.low_acc"></td>
            </tr>
        </table>
        
        <p></p>
        <table cellspacing="0px" class="tb1">
            <tr>
                <th colspan="6"><h3><span v-if="!dashview"><router-link to="/">Dashboard</router-link> | </span> My Play-Accounts | {{mpa.tt}} contas registradas.</h3> </th>
            </tr>
          <tr>
            <th>Account #ID</th>
            <th>Game</th>
            <th>Status</th>
            <th>Player</th>
            <th>Total Points</th>
            <td></td>
          </tr>
          <tr v-for="v of mpa.rr" :key="v.id">
              <td>{{v.titulo}} #{{v.idplay_accounts}}</td>
              <td align="center">{{v.game_nome}}</td>
              <td align="center"><span v-html="UTILS.vStatusPlayAcc(v.status)"></span></td>
              <td align="center">{{v.player_nome}}</td>
              <td align="center">{{v.total_points}}</td>
              <td><router-link :to="'/play-account/'+v.idplay_accounts">Acessar</router-link></td>
          </tr>
          <tr>
              <th colspan="6"><h3><router-link to="/new-play-account"> + Cadastrar nova conta</router-link></h3></th>
          </tr>
        </table>
        
      </div>
</template>

<script>
import MYPLAYACC from '../services/playacc'
import UTILS from '@/utils/utils'
import dayjs from 'dayjs'

export default {
    props: ['dashview'],
    data(){
        return {
            mpa: [],
            all: {
                total_slp: 0,
                total_claimed: 0,
                total_slp_avg: 0,
                next_claim: 0,
                roi:0,
                roi_day:0,
                roi_month:0,
                total_invested:0,
                high_slp:0,
                high_acc:null,
                low_slp:0,
                low_acc: null
            },
            UTILS
        }
    },
    methods: {
        buscaMPAs(){
            MYPLAYACC.buscaTodasPlayAcc()
            .then(r => {
                this.mpa = r.data

                if(r.data.rr){
                    this.apiData(r.data.rr)
                }
                return
            })
            .catch(err => {
                return alert(err)
            })
        },
        apiData(data){
            let all = this.all
            let mm = data
            let hoje = new Date()
            let tdia = 0
            let md = 0
            let low = []
            let low_acc = []

            for(var v in mm){
                
                //CALCULA TOTAL INVESTIDO NAS CONTAS
                all.total_invested += mm[v].cost_total

                if(mm[v].api_data!=null && mm[v].api_data.blockchain_related.signature){

                    let mmm = mm[v].api_data
                    let ttt = mmm.total ? mmm.total : 0;
                    let cpp = mmm.blockchain_related.checkpoint ? mmm.blockchain_related.checkpoint : 0
                    //CALCULA TOTAL DE SLPS
                    
                    all.total_slp += cpp
                    all.total_slp += ttt
                    all.total_claimed += cpp

                    //CALC AVG SLP/DIA
                    let dd = mm[v].data_buy ? mm[v].data_buy.split('/') : ['01','01','2021']
                    let ddd = dd[2] + '/' + dd[1] + '/' + dd[0]
                    let created = Date.parse(ddd)
                    
                    let day1 = dayjs(hoje)
                    let day2 = dayjs(created)

                    let tt = (parseInt(ttt)+parseInt(cpp))
                    
                    if(tt>0){
                        tdia += (tt / day1.diff(day2,'day'))
                        md = (tt / day1.diff(day2,'day'))
                        low.push(md)
                        low_acc[md] = mm[v].titulo + ' | <i>' + mm[v].player_nome + '</i>'
                    } 

                    //BEST PERFORMANCE AND PLAY-ACC
                    if(md > all.high_slp){
                        all.high_slp = md 
                        all.high_acc = mm[v].titulo + ' | <i>' + mm[v].player_nome + '</i>'
                    } 

                    //BUSCA DATA DE CLAIM MAIS PROXIMA [NEXT CLAIM]
                    let lastc = mmm.blockchain_related ? mmm.blockchain_related.signature.timestamp : 0;
                    if(all.next_claim==0) all.next_claim = lastc
                    if(lastc < all.next_claim){
                        all.next_claim = lastc
                        all.next_claim_acc = mm[v].titulo
                        all.next_claim_slp = ttt
                    } 
                }
            }
            
            all.low_slp = Math.min(...low)
            all.low_acc = low_acc[all.low_slp]
            all.total_slp_avg = tdia

            //CALC DE ROI
            let coinm = JSON.parse(localStorage.getItem('coinmarket'))
            let curr = localStorage.getItem('currency')
            all.roi = ((all.total_slp*coinm['smooth-love-potion'][curr]) / (all.total_invested*coinm['ethereum'][curr]))*100
            all.roi_day = ((tdia*coinm['smooth-love-potion'][curr]) / (all.total_invested*coinm['ethereum'][curr]))*100
            all.roi_month = (((tdia*30)*coinm['smooth-love-potion'][curr]) / (all.total_invested*coinm['ethereum'][curr]))*100
        }
        
    },
    mounted(){
        return this.buscaMPAs()
    }
}
</script>

<style>
.teste{
    display: flex;
    justify-content: space-between;
}
</style>