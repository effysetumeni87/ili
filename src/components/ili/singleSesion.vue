<template>
<div>
<div class="row text-subtitle1 text-weight-bold justify-center" v-if="this.$store.state.quarterReports.loading==true">
 loading.....
</div>
  <div class="row" v-else>
        <q-card class="col-12">
          
            <q-toolbar>
              <q-toolbar-title>
            <q-btn outline label="back" icon="arrow_back"  @click="goBack()" />
           
             <!-- {{type.toUpperCase()}}:{{id.toUpperCase()}} -->
              </q-toolbar-title>
              <create-session/>
              <!-- <q-btn outline label="go to form" type="a" href="https://forms.gle/RtCZrvpTwXr4ToXz5" target="_blank" /> -->
            </q-toolbar>
          
             <q-card flat bordered>
          <div class="row">
              <div class="col-9"  >
                <q-toolbar class="bg-blue-grey-10 text-weight-bold text-white text-caption">
                    {{current[0].type.toUpperCase()}}:{{current[0].id.toUpperCase()}}   
                     DETAILS 
                    <q-space />
                      <div class="text-teal-1 text-weight-bolder">
                        STATUS
                        <!-- <q-btn flat (this.$store.state.quarterReports.)?label="SELF-ASSESSEMENT" icon-right="check_circle"    />
                        <q-btn flat  label="BRAIN-STORM" icon="today"    /> -->
                        </div>                 
                </q-toolbar>
                <q-card-section class="text-weight-bold">
                 <q-btn flat  :label="'Session Date:' +' '+ current[0].date" icon="today"    />
                 <q-btn flat :label="'Session ID:' +' '+ current[0].id" icon="select_all" />
                 <q-btn flat v-if=" current[0].type=='racer'" :label="'Total Participants:' + Racerparticipants +' '" icon="supervisor_account" />
                 <q-btn flat v-else-if="current[0].type=='pre_plc'" :label="'Total Participants:' + preplcParticipants +' '" icon="supervisor_account" />
                 <q-btn flat v-else-if="current[0].type=='pecogo'" :label="'Total Participants:' + pecogoParticipants +' '" icon="supervisor_account" />
                 <q-btn flat v-else-if="current[0].type=='plc'" :label="'Total Participants:' + plcParticipants +' '" icon="supervisor_account" />
               
                 <q-btn flat v-else-if="current[0].id=='HSCM1'" :label="'Total Participants:' + hscmpreplcParticipants +' '" icon="supervisor_account" />
              
                <div>   
                      {{current[0].title}}       
                </div>
                </q-card-section>
                  
              </div>
               
              
            <div class="col-3 bg-grey-1">
              <!-- <q-toolbar class="bg-grey-1  text-center justify-center text-weight-bolder text-blue-grey-10">
               ARTICLES
               </q-toolbar> -->
               <q-toolbar class="bg-blue-grey-8  text-center justify-center text-weight-bold text-white">
                 Actions  
               </q-toolbar>
              <q-card-section>
                <div class="row justify-center">               
                <edit-session :session="current[0]"/>   
                <send-raceremailpopup :id="id" v-if="racerresAvailable" />
                <send-pecogoemailpopup v-else-if="pecogoresAvailable" />
                <send-plcemailpopup  v-else-if="plcresAvailable" />
                <send-preplcemailpopup v-else-if="preplcresAvailable"  />
                <send-hscmemailpopup v-else-if="hscmresAvailable" />
                </div>
              </q-card-section>
            </div>
          </div>
      </q-card>
      <!-- <div v-if="current[0].type=='racer'">
      <racerresults :actsessionId="id" />
      </div>
      <div v-else-if="current[0].type=='pecogo'">
      <pecogoresults :actsessionId="id" />
      </div>
      <div v-else-if="current[0].type=='pre_plc'">
         <preplcresults :resID ="id"/>
      </div>
      <div v-else-if="current[0].type=='plc'">
         <plcresults :resID ="id"/>
       </div>
        <div v-else-if="hscm1">
         <hscmresults :resID ="id"/>
        </div> -->
        <q-card class="row q-mt-lg">
       
        <q-card-section class="col-12 text-center text-subtitle2 text-weight-bold">
         
          <q-card class="row">
            <q-card-section class=' col-3 bg-grey-1'>
              Participants
            </q-card-section>
            <q-card-section class="text-left col-9 bg-grey-2">
             {{current[0].participants}}
            </q-card-section>
             <q-separator />

             <q-card-section class=' col-3 bg-grey-1'>
              Objectives
            </q-card-section>
            <q-card-section v-html="objectives" class="text-left col-9 bg-blue-grey-1">
              
            </q-card-section>
             <q-separator />
             <q-card-section class=' col-3 bg-grey-1'>
              Topics
            </q-card-section>
            <q-card-section v-html="topics" class="text-left col-9 bg-grey-2">
              
            </q-card-section>
             <q-separator />

             <q-card-section class=' col-3 bg-grey-1'>
              Approach
            </q-card-section>
            <q-card-section v-html="approach" class="text-left col-9 bg-blue-grey-1">
            
            </q-card-section>
             <q-separator />
          </q-card>
         
       </q-card-section>
      
    </q-card>
        
      </q-card>

  </div>
</div>
</template>

<script>
import preplcresults from './preplcResults'
import racerresults from './racerResults'
import editSession from './editSession'
import sendRaceremailpopup from './popUps/racerPopup'
import sendPecogoemailpopup from './popUps/pecogoPopup'
import sendPlcemailpopup from './popUps/plcPopup'
import sendPreplcemailpopup from './popUps/preplcPopup'
import sendHscmemailpopup from './popUps/hscm1'
import plcresults from './plcresults'
import pecogoresults from './pecogoresults'
import hscmresults from './hscmresults'
import {mapState ,mapGetters} from 'vuex'
import createSession from './addNewsession'

export default {
   components:{
   createSession ,editSession ,preplcresults , racerresults , plcresults ,pecogoresults 
   ,hscmresults, sendRaceremailpopup, sendPecogoemailpopup , sendPlcemailpopup,
   sendPreplcemailpopup , sendHscmemailpopup
    
   },
    data(){
        return {
           iecTab: 'all',
            page: 1,
            currentPage:1,
            nextPage: null,
            totalPages:5,

        }
    },
created(){
       // this.$store.commit('quarterReports/Loading', true)
        console.log(this.$route.params.id)
      //  console.log(this.$store.state.quarterReports)
        const id = this.$route.params.id
        //this.$store.commit('quarterReports/getpreplc')
        this.$store.dispatch('quarterReports/getSession',id)
    },

    computed:{
        ...mapGetters({
      current1: 'quarterReports/current',
      emails: 'quarterReports/emails',
      Racerparticipants: 'quarterReports/Racerparticipants',     
      hscmpreplcParticipants: 'quarterReports/hscmpreplcParticipants',
      preplcParticipants:  'quarterReports/preplcParticipants',
      plcParticipants:  'quarterReports/plcParticipants',
      pecogoParticipants:  'quarterReports/pecogoParticipants',
        }),
        racerresAvailable(){
                
        //  if (this.$store.state.quarterReports.racerRes.length > 0 && this.current[0].type=='racer'){
         
         if ( this.current[0].type=='racer'){
           return true
         }else{
           return false
         }
         
        
        },
        approach(){
          return this.cutt

        },
        topics(){
          var topicArr =this.current[0].topics 
          var topicStr  = ''
          for( var i =0 ; i<topicArr.length ; i++){
               topicStr+=(i+1)+". "+topicArr[i]+( `<br/>`)
          }
          return topicStr
        },
         objectives(){
          var topicArr =this.current[0].objectives
          var topicStr  = ''
          for( var i =0 ; i<topicArr.length ; i++){
               topicStr+=(i+1)+". "+topicArr[i]+( `<br/>`)
          }
          return topicStr
        },
        approach(){
          var topicArr =this.current[0].seminarApproach
          var topicStr  = ''
          for( var i =0 ; i<topicArr.length ; i++){
               topicStr+=(i+1)+". "+topicArr[i]+( `<br/>`)
          }
          return topicStr
        },
         pecogoresAvailable(){
                
         if (this.$store.state.quarterReports.pecogoRes.length > 0 && this.current[0].type=='pecogo'){
           return true
         }else{
           return false
         }
         
        
        },
       plcresAvailable(){
                
         if (this.$store.state.quarterReports.plcRes.length > 0 && this.current[0].type=='plc'){
           return true
         }else{
           return false
         }
         
        
        },
         preplcresAvailable(){
                
         if (this.$store.state.quarterReports.preplcRes.length > 0 && this.current[0].type=='pre_plc'){
           return true
         }else{
           return false
         }
         
        
        },
        hscmresAvailable(){
                
         if (this.$store.state.quarterReports.hscm1.length > 0 && this.current[0].id=="HSCM1"){
           return true
         }else{
           return false
         }
         
        
        },

        hscm1(){
          if(this.current[0].id=='HSCM1' && this.current[0].type=='pre_plc'){
            return true
          }else{
            return false
          }
        },
        current(){
        return this.$store.state.quarterReports.oneSession
        },
       id(){
        return  this.$route.params.id
      },
      type(){
          return this.$route.params.data.type
      },
      
     
      
    },
    methods: {
      goBack(){
      this.$router.back()
      },
      download(index){
        const doc = new jsPDF()
        const docdata = this.iecLists[index]
        //const text = 'Lorem ipsum dolor sit amettis mauris, a sagittis elit fermentum consectetur. vamus mattis lobortis mauris, a sagittis elit fermentum consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis lobortis it amet, sectetur.'
        //console.log(docdata)
        
        doc.text('PLC Assessment', 10,10)
       // doc.text(docdata['Email Address'], 10,20)
       //  doc.text(docdata['Name of Organisation'], 10,30)
        //var lines =doc.splitTextToSize(text,(10,15,210))
        doc.line(0,20,400,20)
        //doc.text(lines ,(10,50 ))
        
        
       jsPDFtable( doc ,{
          head: [['Variable ' , 'Answer']],
          margin: {top:50},
          body: [['1. Program ID:',docdata['1. Program ID:']],
                 ['2. Full Names:', docdata['2. Full Names:']],
                 ['3. Organization',docdata['3. Organization']],
                 ['4. Name of facility where you work :', docdata['4. Name of facility where you work :']],
                 ['5. Your Job Title:',docdata['5. Your Job Title:']],
                 ['6. Main function of your job:',docdata['6. Main function of your job:']],
                 ['7. Title of Your Supervisor:',docdata['7. Title of Your Supervisor:']],
                 ['8. Number of people you supervise',docdata['8. Number of people you supervise']],    
                 ['9. Main function at your job:',docdata['   9. Main function at your job:'] ],
                 ['10. What is your Procurement Responsibility?:',docdata['10. What is your Procurement Responsibility?:']],
                 ['11. What is your Management Responsibility?',docdata['11. What is your Management Responsibility?']],
                 ['12. What problem do you want to solve?:' ,docdata['12. What problem do you want to solve?:']],
                 ['13. Why do you want to solve this problem?:' ,docdata['13. Why do you want to solve this problem?:']],
                 ['14. What will be the benefit to you?:' ,docdata['14. What will be the benefit to you?:']],
                 ['15. What will be the benefit to the organisation?:' ,docdata['15. What will be the benefit to the organisation?:']],
               
                
                [' ', ' '],
                 ['Udugu Approval ', "_________________________________________________"],
                 ['Supervisor Approval ', "_________________________________________________"],
                 
                 
          ]
        })
        doc.save(docdata['2. Full Names:']+"_" +docdata['3. Organization']+'_pre_plc.pdf')
      }
    }

}
</script>

<style>

</style>