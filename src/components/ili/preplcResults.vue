<template>
  <div>
       <q-tabs
          v-model="iecTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="all" label="All Responses" />
           
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="iecTab" animated>
         
          <q-tab-panel name="all" class="row justify-center ">
            <div class="q-pa-lg flex flex-center col-12 ">
    <q-pagination
      v-model="page"
      :max="Math.ceil(iecLists.length/totalPages)"
      :min="currentPage" 
      :direction-links="true"
      :boundary-links="true"
      :input="true"
      input-class="text-orange-10"
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
    >
    </q-pagination>
           </div>
           <q-list bordered separator class="rounded-borders justify-center" style="max-width: 700px">
      <q-item-label header> </q-item-label>

      <q-item v-for="(iec,index) in getData" :key="index" clickable >
        <q-item-section avatar top>
          <q-icon name="assignment" color="black" size="34px" />
        </q-item-section>

       <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">Date</span>
            <span class="text-grey-8"> </span>
          </q-item-label>
          <q-item-label caption lines="1">
             
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">{{iec.Timestamp}}</span>
          </q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">Organization</span>
            <span class="text-grey-8"> </span>
          </q-item-label>
          <q-item-label caption lines="1">
             
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">{{iec["3. Organization"]}}</span>
          </q-item-label>
        </q-item-section>
        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">EMAIL</span>
             
          </q-item-label>
          <q-item-label caption lines="1">
             
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">{{iec['Email Address']}} </span>
          </q-item-label>
        </q-item-section>
        <q-item-section class="row" top side>
          <div class=" row text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" @click="download(email)" type="a" target="_blank" flat dense round icon="cloud_download" />
           <view-plc :singlePlcid='iec["Timestamp"]' />
            
          </div>
        </q-item-section>
      </q-item>
           </q-list>
           
          </q-tab-panel>

          <!-- <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel> -->
        </q-tab-panels>
  </div>
</template>

<script>
// import viewPlc from './singlePreplc'
import jsPDF from 'jspdf'
import jsPDFtable from 'jspdf-autotable'
export default {
props:['resID'],
components:{},
 data(){
        return {
           iecTab: 'all',
            page: 1,
            currentPage:1,
            nextPage: null,
            totalPages:5,

        }
    },
computed:{
  
   docLists(){
      return  this.$store.state.quarterReports.preplcReports
   },
    iecLists(){
              //  this.$route
              const docsId = this.$route.params.id
               const list =   this.$store.state.quarterReports.preplcReports
               return list.filter(x=>x['1. Program ID:']==docsId)
      },
   // 13989 kuwadzana
    iecListslength(){
              //  this.$route
              const docsId = this.resID
               const list =   this.$store.state.quarterReports.preplcReports
               return list.filter(x=>x['1. Program ID:']==docsId).length
      },
      //pagList()
      getData(){
        return  this.iecLists.slice((this.page-1)*this.totalPages,(this.page-1)*this.totalPages+this.totalPages)
    }
},
created(){
  const id = this.resID
  this.$store.dispatch('quarterReports/getHSCM1',id)
},
methods:{
  download(index){
        const doc = new jsPDF()
        const docdata = this.iecLists[index]
        //const text = 'Lorem ipsum dolor sit amettis mauris, a sagittis elit fermentum consectetur. vamus mattis lobortis mauris, a sagittis elit fermentum consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis lobortis it amet, sectetur.'
        //console.log(docdata)
        
        doc.text('PLC Assessment', 10,10)
        doc.text(docdata['Email Address'],10,18)
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
                 ['9. Main function of your job:',docdata['   9. Main function at your job:'] ],
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
        
        //doc.text(lines ,(10,50 ))
        doc.save(docdata['Email Address']+docdata['2. Full Names:']+"_" +docdata['3. Organization']+'_pre_plc.pdf')
      }
    
}
}
</script>

<style>

</style>