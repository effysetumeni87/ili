   <template>
  <div class="q-pa-xs" style="min-width:340px;">
    
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
    >
     <q-form
      ref="plcform"
      @submit="createSession"
     >
      <q-step
        :name="1"
        title="STEP 1: Select an option"
        icon="assignment"
        :done="step > 1"
      >
       <!-- <q-file outlined  label="upload file">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
        </q-file> -->
      <q-option-group
      v-model="form.type"
      :options="options"
      color="primary"
      label-color="black"
        
      :rules="[
          val => val !== null && val !== '' || 'choose an option',
          
        ]"
      @input="links()"
            
    />
    <div v-if="form.type=='other'" class="text-subtitle1 text-orange-10 q-mt-md">
       Enter Google Form Link Below
        </div>
       <div class="text-subtitle1 q-mt-md">
        Google Form Link
        </div> 
        {{form.link}} <q-btn flat icon="launch" color="green" 
        class="q-mx-md" type="a" target="_blank" :href="form.link" />
         <q-input 
         ref="googleLink"
         @="check()"
         autofocus
         :rules="[
          val => val !== null && val !== '' || 'enter a value or select an option above',
         
        ]"
         v-model="form.link"  filled class="q-mb-lg"  label="Google Form Link">
        <template v-slot:append>
          <q-icon name="edit" />
        </template>
      </q-input>

        
        <q-stepper-navigation>
          <q-btn @click="step = 2" :disable="check()" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="STEP 2: Session Details"
        caption="Required"
        icon="edit"
        :done="step > 2"
      >
      
       <!-- date -->
       <div class="q-mb-lg" style="min-width: 400px">
         <div>
           <!-- <span>single day Session</span>
           <q-toggle
            
           color="orange-10"
      false-value="Single"
      true-value="Multi"
      v-model="eventType"
    />
           <span>Multi day Session</span>
             -->
         </div> 
         <!-- seminar title -->
          
       <q-input
      label-color="black"
      autofocus
          :rules="[
            val => val !== null && val !== '' || 'enter a Date',
          
          ]"
      
      filled v-model="form.date" label="Date and Time" hint="click icon on left to select Date and click icon on right to select time">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="form.date" mask="YYYY-MM-DD HH:mm" />
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="form.date" mask="YYYY-MM-DD HH:mm" format24h />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input> 
  </div>

   <!-- new date and time -->
     <!-- <q-input 
        label-color="black"
        v-model="form.date"
        autofocus
        :rules="[
          val => val !== null && val !== '' || 'enter a date',
         
        ]"
         filled class="text-black q-mb-lg"  label="Seminar Date(s) and Time">
        <template v-slot:append>
          <q-icon name="event" />
        </template>
      </q-input> -->
   <!-- session id -->
        <q-input 
        label-color="black"
        v-model="form.id"
        autofocus
        :rules="[
          val => val !== null && val !== '' || 'enter a session ID',
         
        ]"
         filled class="text-black q-mb-lg"  label="Session Id">
        <template v-slot:append>
          <q-icon name="edit" />
        </template>
      </q-input>

    <!-- location -->
     <q-input 
      v-model="form.location"
      label-color="black"  
        
      filled class="q-mb-lg"  label=" Location" hint="Enter Zoom link for virtual or physical address">
        <template v-slot:append>
          <q-icon name="map" />
        </template>
      </q-input>

      <!-- Title -->
     <q-input 
       v-model="form.title"
       class="q-my-md"
        label-color="black"
      filled autogrow  label="Seminar Title"
      hint="Enter Main title of the seminar">
        <template v-slot:append>
          <q-icon name="format_size" />
        </template>
      </q-input>

        <!-- participants -->
       <q-input 
       v-model="form.participants"
       class="q-my-md"
        label-color="black"
      filled autogrow  label="Participants" 
      hint="Enter participants of the session">
        <template v-slot:append>
          <q-icon name="perm_identity" />
        </template>
      </q-input>

   <!-- discussion topic -->
    <span class="text-weight-bold">Discussion Topics</span><br/>
     <div v-for="(topic,index) in form.topics" :key="topic">
       <span>{{index+1+":"+ " "}}{{topic}} <q-btn size="sm" flat icon="delete" color="orange" @click="deleteTopic(index)"/></span><br/>
     </div>
       <div v-if="topActive">
       <span class=" text-red text-weight-bold">You have reached the max number of toics(3)</span><br/>
      </div>
      <q-input 
      :disable="topActive"
       v-model="topic"
       ref="topic"
        class="q-my-md"
        label-color="black"
      filled autogrow  label="Discussion Topic(s)"
      hint="Enter discussion Topic(s)">
        <template v-slot:append>
          <q-icon name="settings_voice" />
           <q-btn color="green" @click="addTopic()" label="add" icon-right="add"/>
        </template>
      </q-input>

     <!-- objectives title -->
     <span class="text-weight-bold">Objectives</span><br/>
     <div v-for="(objective,index) in form.objectives" :key="objective">
       <span>{{index+1+":"+ " "}}{{objective}} <q-btn size="sm" flat icon="delete" color="orange" @click="deleteObj(index)"/></span><br/>
     </div>
      <div v-if="objActive">
       <span class=" text-red text-weight-bold">You have reached the max number of Objectives (5)</span><br/>
      </div>

    
      <!-- objectives -->
      <q-input 
      ref="objectiveInput"
      :disable="objActive"
       v-model="objective"
       class="q-my-md"
        label-color="black"
        
      filled autogrow  label="Objectives " 
      hint="Enter each objective of the session  and click add">
        <template v-slot:append>
          <q-icon name="formated_list_bulleted" />
          <q-btn color="green" @click="addObj()" label="add" icon-right="add"/>
        </template>
      </q-input>
 
      <!-- suggested approach -->

     <span  class="text-weight-bold" > Suggested Seminar Approach </span><br/>
      <span  class="text-italic" > Type each part of the Seminar below and click add </span>
       <div v-for="(approach,index) in form.seminarApproach" :key="index">
         <div class="row">
       <div v-html="(index+1)+':'+''+approach"></div> <div><q-btn size="sm" flat icon="delete" color="orange" @click="deleteSem(index)"/></div>
         </div>
     </div>
     <div v-if="aprActive">
       <span class=" text-red text-weight-bold">You have reached the max number of items (5)</span><br/>
      </div>

     <q-input 
      ref="approach"
      v-model="form.approach  "
      :disable="aprActive"
       
       class="q-my-md"
        label-color="black"
        
      filled autogrow  label="Seminar Approach" 
      hint="enter each part of the seminar and click add">
        <template v-slot:append>
          <q-icon name="assignment" />
          <q-btn color="green" @click="addSeminaritem()" label="add" icon-right="add"/>
        </template>
      </q-input>
       <!-- <q-editor
       @keyup.prevent.enter="addSeminaritem()"
      ref="approach"
      v-model="form.approach  "
      :definitions="{
        
        upload: {
          tip: 'Click to add item',
          icon: 'add',
          label: ' add item',
          handler: addSeminaritem
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    /> -->
        
       
      <!-- <q-input
      v-model="text"
      hint="Max Characters 1000"
      counter
      label="Suggested Approach"
      filled
      :rules="[ val => val.length <= 20 || 'Please use maximum 1000 characters']"
      type="textarea"
    /> -->
        <q-stepper-navigation>
          <q-btn @click="step = 3" :disable="checkform" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="STEP 3: Email Invites"
        icon="edit"
        caption="required"       
        
        
        :done="step > 3"
        
      >
        <q-input 
        color="black"
       label-color="black"
         autofocus
         ref="useremails"
         v-model="form.emails"
          :rules="[ val => val && val.length > 0 || 'Enter you email' ,
          val => val.includes('@'&&'.') || 'enter a valid email'
        ]"
        autogrow filled   label="Enter Email Addresses" hint="Seperate each email with a comma">
        <template v-slot:append>
          <q-icon name="mail" />
        </template>
      </q-input>
      <q-stepper-navigation>
          <q-btn @click="step = 4"  color="primary" label="Continue" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="STEP4 : Confirm details"
        icon="add_comment"
      >
       
        Confirm If the details you have entered are correct :If not click back to go back and edit
        <q-separator inset class="q-ma-lg" />
        Session Type:       {{form.type}}           <br/>
        Session Date:   {{form.date}}        <br/>
        Session ID:    {{form.id}}         <br/>
        Session Location:  {{form.location}}     <br/>
        Session Title: {{form.title}}   <br/>
        Session Topics:    {{form.topics}}      <br/>
        Session participants:   {{form.participants}}        <br/>
        Session objectives:    {{form.objectives}}         <br/>
        Session Approach:  {{form.seminarApproach}}     <br/>
        <!-- Session Description: {{form.description}}   <br/> -->
        Email Invites:    {{form.emails}}      <br/>
        



        <q-stepper-navigation>
          <q-btn color="green" label="Submit" @click="createSession()" />
          <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
       </q-form>
    </q-stepper>
   
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      editor:'',
      eventType:'Single',
      topic:'',
      objective:'',
      form:{
          type: '',
          approach:'',
          
          topics:[],
          seminarApproach:[],
          participants:'',
          
          title:'',
          link:'',
          date: '',
          id: '',
          location: '',
          description:'',
          
          objectives:[],
          emails:'',

          resultsSummary:'',
          frequencytableActions:[],
          swotActions:[],

          docId:''

      },
      step: 1,
      test: "admin",
       
        plcoptions: [
        {
          label: 'Pre-PLC',
          value: 'pre_plc',
          link:"r34567"
        },
        {
          label: 'Full-PLC',
          value: 'full_plc',
          link: "1q3afzcsrds"
        },],
      options: [
        {
          label: 'RACER',
          value: 'racer',
          link:"https://forms.gle/Cdg6UeQDae2ftMfk8"
        },
        {
          label: 'Pre-PLC',
          value: 'pre_plc',
          link:"https://forms.gle/4skRHAEyQH12dyjh7"
        },
        {
          label: 'Full-PLC',
          value: 'full_plc',
          link: "https://forms.gle/LnnQo4iw1DVZikrR7"
        },
        {
          label: 'PECOGO',
          value: 'pecogo',
          link: "https://forms.gle/bm1t8rSBwfwTHpKF6"
        },
        {
          label: 'OTHER',
          value: 'other',
          link: ""
        }
      ]
    }
  },
  created(){
     var data = this.currentSession[0]
     this.form.type = data.type
     this.form.approach = data.approach
     this.form.topics = data.topics
     this.form.seminarApproach = data.seminarApproach
     this.form.participants = data.participants
     this.form.title = data.title
     this.form.link = data.link
     this.form.date = data.date
     this.form.id = data.id
     this.form.location = data.location
     this.form.description = data.description
     this.form.objectives = data.objectives
     this.form.emails = data.emails
    this.form.resultsSummary = data.resultsSummary
    this.form.frequencytableActions = data.frequencytableActions
    this.form.swotActions = data.swotActions
     this.form.docId = data.docId
    


  },
  computed:{
       ...mapGetters({
      current1: 'quarterReports/currentSession',
      emails: 'quarterReports/Emails',
      participants: 'quarterReports/participants',     
     racerRes: 'quarterReports/racerRes', 
        }),
         currentSession(){
           return this.$store.state.quarterReports.oneSession
         },
    topActive(){
       if(this.form.topics.length <3 ){
        return false
      }else{
        return true
      }
    },
    aprActive(){
      if(this.form.seminarApproach.length <=4 ){
        return false
      }else{
        return true
      }
    },
    disAble(){
      if(this.form.approach.length <150 ){
        return false
      }else{
        return true
      }
    },
    objActive(){
      if(this.form.objectives.length <=4 ){
        return false
      }else{
        return true
      }
    },
     checkform(){
         if (this.form.id == "") {
            return true   
         }else{
             return false
         }
                 
     },
     
  },
  methods:{
    addSeminaritem(){
      if(this.form.approach.length>0){
      const val = this.$refs.approach.value
      this.form.seminarApproach.push(val)
      this.form.approach=""
      }else{
        this.$q.notify({
          message: 'Enter a Value, ',
          color: 'red'
        })
      }
    },
    addTopic(){
      if(this.topic.length>0){
      const val = this.$refs.topic.value
      this.form.topics.push(val)
      this.topic=""
      }else{
        this.$q.notify({
          message: 'Enter a Value, ',
          color: 'red'
        })
      }
    },
    deleteSem(index){
     this.form.seminarApproach.splice(index,1)
    },
    deleteTopic(index){
     this.form.topics.splice(index,1)
    },
    deleteObj(index){
  this.form.objectives.splice(index,1)
    },
    addObj(){
      if(this.objective.length>0){
      const val = this.$refs.objectiveInput.value
      this.form.objectives.push(val)
      this.objective=""
      }else{
        this.$q.notify({
          message: 'Enter a Value, ',
          color: 'red'
        })
      }
    },
    deleteItem(){
     this.editor= this.editor.slice(0,-1)
    },
      checkemail(){
         console.log(this.form.emails.length)
         if (this.form.emails.length !==0 ) {
            return true   
         }else{
             return false
         }
                 
     },
      links(){
         var x= this.options.filter(x=>x.value == this.form.type)
          
           this.form.link = x[0]['link']
      
           return this.form.link
         
      },
      createSession:function(){
         this.$refs.plcform.validate().then( success=>{
              if(success){
                   const data= this.form
                   this.$store.dispatch('quarterReports/editSession', data )
                   
            
       }else{
              alert("err")
       }
         }).catch(err=>{
              console.log(err.msg)
         }) 
      },
      check(){
          if (this.form.link == "") {
            return true   
         }else{
             return false
         }
                 
     
      }
  },

}
</script>