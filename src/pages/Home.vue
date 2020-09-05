<template>
  <div>
      <div>
        <!-- <q-card flat>
            <q-card-section class="text-weight-bold text-h6 text-center text-green">
                Loading...
            </q-card-section>
        </q-card> -->
      </div>
      <div>
        <q-card flat>
            <q-toolbar class="">
              <q-toolbar-title>
                  ILI Sessions
              </q-toolbar-title>
              <add-newsession/>
            </q-toolbar>
            <q-card-section>
               <q-card>
        <q-tabs
          v-model="tab"
          dense
          class=" bg-blue-grey-1 text-black"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="all" label="All" />
          <q-tab name="preplc" label="Pre-PLC" />
          <q-tab name="plc" label="PLC" />
          <q-tab name="racer" label="RACER" />
          <q-tab name="pecogo" label="PECOGO" />
          <q-tab name="other" label="OTHER" />
        </q-tabs>

        <q-separator  />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="all">
            <session-item :items="all" />
          </q-tab-panel>

          <q-tab-panel name="preplc">
           <session-item :items="preplc" />            
          </q-tab-panel>

          <q-tab-panel name="plc">
           <session-item :items="plc" />            
          </q-tab-panel>

          <q-tab-panel name="racer">
            <session-item :items="racer" />
          </q-tab-panel>
          <q-tab-panel name="pecogo">
            <session-item :items="pecogo" />
           </q-tab-panel>
          <q-tab-panel name="other">
            <session-item :items="other" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
       </q-card-section>
        </q-card>
      </div>
  </div>
</template>

<script>
//import newSession from ''
import addNewsession from '../components/ili/addNewsession'
import sessionItem from '../components/ili/sessionItem'
import {mapGetters} from 'vuex'
export default {
  components :{
    sessionItem, addNewsession
  },
     data(){
       return {
         tab: 'all'
       }
     },
     created(){
       this.$store.dispatch('quarterReports/getSessions')
     }, 
     computed:{
      ...mapGetters({
      plc: 'quarterReports/PLC',
      racer: 'quarterReports/racer',
      preplc: 'quarterReports/prePLC',     
      pecogo: 'quarterReports/pecogo', 
      all: 'quarterReports/all',     
      other: 'quarterReports/other', 
      })
     }
}
</script>

<style>

</style>