 <template>
  <div class="q-pa-md">
    <div v-if="this.$store.state.quarterReports.loadingRacer==true" class="text-h6 text-center text-weight-bold">
       Loading ....<q-btn flat @click="refresh()" class="q-mx-xl" color="green" label="refresh" icon-right="refresh" ></q-btn>
  
    </div>
    <div v-else>
     <div v-if="this.$store.state.quarterReports.racerRes.length==0" class="text-h6 text-center text-red text-weight-bold">
       !! There is no data   <q-btn flat @click="refresh()" class="q-mx-xl" color="green" label="refresh" icon-right="refresh" ></q-btn>
     </div>
     <div v-else >

     
    <q-table
    
      :data="data2"
      :columns="columns"
      row-key="name"
    />
    <q-card class="row q-mt-lg">
       <q-card-section class=" flex col-2 text-center justify-center self-center text-h6 text-weight-bold ">
         O
       </q-card-section>
        <q-card-section class="col-8 text-center text-h6 text-weight-bold">
         S
          <q-card class="row">
            <q-card-section :class="(72<=total && total<=90)?'col-6 bg-green text-white ':' col-6 bg-grey-5'">
              I(72-90)
            </q-card-section>
            <q-card-section :class="(54<=total && total<=71)?'col-6 bg-green text-white ':' col-6 bg-grey-4'">
              II(54-71)
            </q-card-section>
             <q-card-section :class="(36<=total && total<=53)?'col-6 bg-green text-white ':' col-6 bg-grey-3'">
              III(36-53)
            </q-card-section>
            <q-card-section :class="(18<=total && total<=35)?'col-6 bg-green text-white ':' col-6 bg-grey-2'">
              IV(18-35)
            </q-card-section>
          </q-card>
         w
       </q-card-section>
        <q-card-section class=" flex text-h6 self-center col-2 justify-center text-weight-bold">
         T
       </q-card-section>
    </q-card>
    </div>
     </div>
  </div>
</template>

 <script>

 import {mapGetters} from  'vuex'
import quarterReports from 'src/store/reports/quaterReports'
export default {
  props:['actsessionId'],
  data () {
    return {
      total: 0,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Frequency Table',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable:false,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 100px',
          headerClasses: 'bg-primary text-white'
        },
        { name: 'setting', align: 'center', label: 'Setting objectives', field: 'setting',  },
        { name: 'Achieving',align: 'center', label: 'Achieving Objectives', field: 'Achieving',   },
        { name: 'Solving ',align: 'center', label: 'Solving Problems', field: 'Solving' },
        { name: 'Total',align: 'center', label: 'Total', field: 'Total' },
        
       ],
      
    }
  },
  created(){
    const id = this.actsessionId
    this.$store.dispatch('quarterReports/getRacer',id)
  },
  computed:{
   ...mapGetters({
      current1: 'quarterReports/current',
      emails: 'quarterReports/Emails',
      participants: 'quarterReports/participants', 
     racerRes:'quarterReports/racerRes'
   }),
    data2(){
      if(this.racerRes.length>0){
     const participants= this.participants
        const docdata = this.racerRes
        const current = this.current1
         
        const total1 = docdata.reduce((acc,num)=>{
           var tot=  parseFloat(acc) + parseFloat(num)
            return tot.toFixed(2)
        });
         const indTotal = docdata.slice(0,3).reduce((acc,num)=>{
           var tot=  parseFloat(acc) + parseFloat(num)
            return tot.toFixed(2)
        });
         const instTotal = docdata.slice(3,6).reduce((acc,num)=>{
           var tot=  parseFloat(acc) + parseFloat(num)
            return tot.toFixed(2)
        });
         const socTotal = docdata.slice(6,9).reduce((acc,num)=>{
           var tot=  parseFloat(acc) + parseFloat(num)
            return tot.toFixed(2)
        });
        const totalSet =(parseFloat(docdata[0])+parseFloat(docdata[3])+parseFloat(docdata[6])).toFixed(2)
        const totalArch = (parseFloat(docdata[1])+parseFloat(docdata[4])+parseFloat(docdata[7])).toFixed(2)
        const totalSolv = (parseFloat(docdata[2])+parseFloat(docdata[5])+parseFloat(docdata[8])).toFixed(2)
                           
        var total =  (parseFloat(totalSet)+parseFloat(totalArch)+parseFloat(totalSolv)+parseFloat(socTotal)+parseFloat(instTotal)+parseFloat(indTotal)).toFixed(2)
       this.total = total
   var data = [
        {
          name: 'Individual:',
          setting: docdata[0],
          Achieving:docdata[1],
          Solving: docdata[2],
          Total: indTotal,
          
        },
        {
          name: 'Institution:',
          setting: docdata[3],
          Achieving:docdata[4],
          Solving: docdata[5],
          Total: instTotal,
          
        },
        {
          name: 'Society:',
          setting: docdata[6],
          Achieving: docdata[7],
          Solving: docdata[8],
          Total: socTotal,
         
        },
        {
          name: 'Total:',
          setting: totalSet,
          Achieving: totalArch,
          Solving: totalSolv,
          Total: total,
          
        },
             
                
        
      ]
      return data
    }
  }
  },
  methods:{
    refresh(){
      const id = this.actsessionId
    this.$store.dispatch('quarterReports/getRacer',id)
    }
  }
}
</script>