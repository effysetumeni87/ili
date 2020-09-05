<template>
  <div>
      <q-btn label="Add new Session" color="primary" icon-right="add_circle" @click="setAddsession(true)" />
      <q-dialog v-model="addsessionDialogue" persistent>
      <q-card style="min-width:350px">
        <q-card-section>
          <div class="text-h6"> Add New Session</div>
        </q-card-section>

        <q-separator />
       
        <q-card-section style="max-height: 50vh" class="scroll">
           <sessionStepper />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="close" color="primary" v-close-popup />
          
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import sessionStepper from './sessionStepper'
export default {
    components:{
 sessionStepper
    },
 data(){
     return {
         fixed: false
     }
 },
 computed:{
   addsessionDialogue:{
     get(){
     return this.$store.state.quarterReports.popUp1
     },
     set(val){
      this.$store.commit('quarterReports/Pop_UP1',val)
     }
   }
 },
 methods:{
   setAddsession(val){
   this.$store.commit('quarterReports/Pop_UP1',val)
   }
 }
}
</script>

<style>

</style>