<template>
  <div :class="dashview ? '': 'content1'">
        <h3><span v-if="!dashview"><router-link to="/">Dashboard</router-link> | </span> My Play-Accounts | {{mpa.tt}} contas registradas.</h3>
        
        <table class="tb1" v-if="mpa.tt || mpa.tt > 0">
            <tr>
                <th>TOTAL INVESTED</th>
                <td>{{all.total_invested}} <span class="price">{{UTILS.priceCoin(all.total_invested,'ethereum')}}</span></td>
                <th>ROI</th>
                <td>{{all.roi.toFixed(2)}}%</td>
                <th>ROI [p/ day]</th>
                <td>{{all.roi_day.toFixed(2)}}%</td>
            </tr>
            <tr>
                <th>SLP TOTAL</th>
                <td>{{all.total_slp}} <span class="price">{{UTILS.priceCoin(all.total_slp,'smooth-love-potion')}}</span></td>
                <th>SLP TOTAL [claimed]</th>
                <td>{{all.total_claimed}} <span class="price">{{UTILS.priceCoin(all.total_claimed,'smooth-love-potion')}}</span></td>
                <th>SLP Avg/Day</th>
                <td>{{all.total_slp_avg.toFixed(0)}} <span class="price">{{UTILS.priceCoin(all.total_slp_avg,'smooth-love-potion')}}</span></td>
            </tr>
            <tr>
                <th>Next Claim</th>
                <td>{{UTILS.timeConverter(all.next_claim,1209600000)}}</td>
                <th>Next Claim [account]</th>
                <td>{{all.next_claim_acc}}</td>
                <th>Next Claim [SLP]</th>
                <td>{{all.next_claim_slp}}<span class="price">{{UTILS.priceCoin(all.next_claim_slp,'smooth-love-potion')}}</span></td>
            </tr>
        </table>
        
        <p></p>
        <table cellspacing="0px" class="tb1">
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
        </table>
        <h4><router-link to="/new-play-account"> + Cadastrar nova conta</router-link></h4>
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
                roi_day:0
            },
            UTILS
        }
    },
    methods: {
        buscaMPAs(){
            MYPLAYACC.buscaTodasPlayAcc()
            .then(r => {
                this.mpa = r.data
                let all = this.all
                let mm = this.mpa.rr
                all.total_invested = mm[mm.length-1].total_cost
                let hoje = new Date()
                let tdia = 0

                for(var v in mm){
                    
                    //CALCULA TOTAL INVESTIDO NAS CONTAS

                    if(mm[v].api_data!=null){
                        //CALCULA TOTAL DE SLPS
                        let mmm = mm[v].api_data
                        all.total_slp += mmm.blockchain_related.checkpoint
                        all.total_slp += mmm.total
                        all.total_claimed += mmm.blockchain_related.checkpoint

                        //CALC AVG SLP/DIA
                        let lastc = mmm.blockchain_related ? mmm.blockchain_related.signature.timestamp : 0;
                        
                        let day1 = dayjs(hoje)
                        let day2 = dayjs(lastc*1000)
                        
                        if(mmm.total>0){
                            tdia += (mmm.total / day1.diff(day2,'day'))
                        } 

                        //BUSCA DATA DE CLAIM MAIS PROXIMA [NEXT CLAIM]
                        if(all.next_claim==0) all.next_claim = lastc
                        if(lastc < all.next_claim){
                            all.next_claim = lastc
                            all.next_claim_acc = mm[v].titulo
                            all.next_claim_slp = mmm.total
                        } 

                    }
                }
                
                all.total_slp_avg = tdia

                //CALC DE ROI
                let coinm = JSON.parse(localStorage.getItem('coinmarket'))
                let curr = localStorage.getItem('currency')
                all.roi = ((all.total_slp*coinm['smooth-love-potion'][curr]) / (all.total_invested*coinm['ethereum'][curr]))*100
                all.roi_day = ((tdia*coinm['smooth-love-potion'][curr]) / (all.total_invested*coinm['ethereum'][curr]))*100

                

                return
            })
            .catch(err => {
                return alert(err)
            })
        },
        
    },
    mounted(){
        return this.buscaMPAs()
    }
}
</script>

<style>

</style>