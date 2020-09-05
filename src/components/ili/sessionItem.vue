<template>
  <div>
      <q-pagination
      v-model="page"
      :max="Math.ceil(items.length/totalPages)"
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
       <q-list bordered>
         <div  v-for="(item,index) in items " :key="index">
        <q-item>
        <q-item-section avatar top>
          <!-- <q-icon name="account_tree" color="black" size="34px" /> -->
          <q-avatar class="bg-teal-10 text-white">
            {{item.type.charAt(0).toUpperCase()+item.type.charAt(1)}}
          </q-avatar>
        </q-item-section>

        <q-item-section top class="col-1 gt-sm">
          <q-item-label class="q-mt-sm">{{item.type.toUpperCase()}}</q-item-label>
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label lines="1">
            <span class="text-weight-medium">Date</span>
            <!-- <span class="text-grey-8"> - GitHub repository</span> -->
          </q-item-label>
           
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">{{item.date}}</span>
          </q-item-label>
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label lines="1">
            <span class="text-weight-medium">Session_Id</span>
            <!-- <span class="text-grey-8"> - GitHub repository</span> -->
          </q-item-label>
           
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">{{item.id}}</span>
          </q-item-label>
        </q-item-section>


        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">Session Details</span>
            <!-- <span class="text-grey-8"> - GitHub repository</span> -->
          </q-item-label>
          <q-item-label caption lines="1" class="text-blacks">
            {{item.title}}
          </q-item-label>
          <!-- <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">Open in GitHub</span>
          </q-item-label> -->
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 row q-gutter-xs">
            <q-btn class="gt-xs" size="12px" color="green-10" @click="gotoSession(item)"  dense label="View" icon-right="search" />
            <delete-session :docId="item.docId"/>
            <!-- <q-btn size="12px" flat dense round icon="more_vert" /> -->
          </div>
        </q-item-section>
       
      </q-item>
       <q-separator spaced />
       </div>
     </q-list>
  </div>
</template>

<script>
import deleteSession from './deleteSession'
export default {
 props: ['items'],
 components:{
   deleteSession
 },
 data(){
     return{
          page: 1,
          currentPage:1,
          nextPage: null,
          totalPages:5,
     }
 },
 methods:{
   gotoSession(item){
     this.$router.push({name:'singleSession', params:{id:item.id, data:item}})
   }
 }
}
</script>

<style>

</style>