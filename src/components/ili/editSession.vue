<template>
  <div>
      <q-btn label="Edit Session Details" flat icon="edit" color="blue-grey-8" @click="setEditsession(true)" />
      <q-dialog v-model="editsessionDialogue">
      <q-card style="min-width:350px;">
        <q-card-section>
          <div class="text-h6">Edit Session Details</div>
        </q-card-section>

        <q-separator />
        
        <q-card-section style="max-height: 50vh" class="scroll">
           <editsessionStepper />
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
import editsessionStepper from './editsessionStepper'
export default {
    components:{
 editsessionStepper
    },
 data(){
     return {
         fixed: false
     }
 },
 computed:{
   editsessionDialogue:{
     get(){
     return this.$store.state.quarterReports.popUp2
     },
     set(val){
      this.$store.commit('quarterReports/Pop_UP2',val)
     }
   }
 },
 methods:{
   setEditsession(val){
   this.$store.commit('quarterReports/Pop_UP2',val)
   }
 }
}
</script>

<style>

</style>