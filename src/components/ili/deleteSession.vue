<template>
  <div>
     
      <q-btn class="gt-xs" color="red" size="12px" @click="popVal(true)" flat dense round icon="delete"  />
      <q-dialog v-model="testVAl">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm below to delete</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll text-h6">
           Are you sure you want to Delete this session
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn  label="Confirm" color="red" @click="delSession" />
          <q-btn flat label="cancel" color="green" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import sessionStepper from './sessionStepper'
export default {
    props:['docId'],
    components:{
 sessionStepper
    },
 data(){
     return {
         fixed: false
     }
 },
 computed:{
 testVAl:{
         get(){
         return this.$store.state.quarterReports.popUp3
         },
         set(val){
          return this.$store.commit('quarterReports/Pop_UP3', val)
         }
     }
 },
 methods:{
    popVal(val){
          this.$store.commit('quarterReports/Pop_UP3', val)
         } ,
    delSession(){
   const  id = this.docId
//    console.log(id)
    this.$store.dispatch('quarterReports/deleteSession', id),
    this.$store.commit('quarterReports/Pop_UP3', false)
 }
 },
 
}
</script>

<style>

</style>