<template>
 <div class="">
     <q-btn class="gt-xs" color="orange-10" size="md" label="VIEW ASSESSMENT Results"  @click="dialog=true"  flat dense icon="assignment" />  
                 
     <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-grey-1 text-white">
        <q-bar  class="bg-indigo-10 ">
           
            Close
          
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
              <div  class="q-mx-xl"></div>
       
          <q-space/>
          
        </q-bar>

     
        
         <q-card-section class="row scroll q-mt-lg" > 
               
             <q-card flat bordered class="col-7 q-ml-md" style="max-height:450px;">
              
                 <div class="text-indigo-10 justify-center bg-blue-grey-10  row" >
                <q-bar class="bg-blue-grey-10 text-white" >
                <q-btn  dense outline icon="cloud_download" @click="download()" >`
              Download pdf document
              <q-tooltip content-class="bg-white text-primary">click to download pdf</q-tooltip>
               </q-btn>
                <q-space/>
                 <!-- <q-btn flat  :label="'Session Date:' +' '+current1[0]['date']" icon="today"    /> -->
                 <!-- <q-btn flat :label="'Session ID:' +' '+current1[0].id" icon="select_all" /> -->
                 <q-btn flat  :label="'Total Participants:' + participants +' '" icon="supervisor_account" />
            
                </q-bar>
                 </div>
                 <div class=" text-black text-weight-bold row">
                 <q-card flat bordered class="col-12">
                     <q-toolbar>
                       SELF ASSESSMENT RESULTS
                     </q-toolbar>
                     <racer-results :actsessionId="id" />
                 </q-card>

                  <q-card flat bordered class="col-12">
                     <q-toolbar>
                      BARINSTORMING SESSION RESULTS
                     </q-toolbar>
                       
                       <brainStorm />
                    
                 </q-card>

                   
                  </div>
                 
             </q-card> 
              <q-card  style="max-height: 98vh" class="q-mr-md fixed-right col-4">
                 <!-- <q-bar class="bg-grey-2 text-blue-grey-10">
                        Participants Emails
                <q-space/><br/>
                    
                 </q-bar>
                 <q-card-section style="max-height:100px" class=" text-blue-grey-10 scroll">
                      {{emails.split(",")}}

                  </q-card-section> -->
                  <q-bar class="bg-blue-grey-2 text-teal-10">
                        CAPACITY ASSESSMENT RESULTS
            <q-space/>
             
                 </q-bar>
            <!-- v-model="form.email" -->
             <q-card-section style="max-height: 85vh" class="text-green scroll">
                 <q-form
      ref="raceremailForm"
      @submit="sendRaceremail"
     >
                 <!-- <q-input filled autogrow
                 hint="to send to multiple recipients , separate each email with a comma "
                  class="q-my-md" icon="mail"  v-model="form.email"  label="  Email :" />
                 <q-input filled  class="q-my-md" v-model="form.subject" label="Email subject:" />
                 <q-input filled autogrow class="q-my-md" v-model="form.message" label="Email Message:" type="text-area" />
                 -->
                 <q-toggle v-model="value" label="Add results as an attachment" />
              
                 <!-- capacity Asssessment summary -->
                 <div v-if="value==true">

                    <br/> <span   class="text-weight-bolder text-black" > A) RESULTS FROM SELF-ASSESSEMENT </span><br/>
                    <br/> <span   class="text-weight-bold text-black" >1. Self Assessment Results Summary </span><br/>
               
                    <q-input v-if="value==true" 
                filled autogrow class="q-my-md" 
                v-model="form.resultsSummerry" label="Summery"
                 :rules="[ val => val && val.length > 0 || 'Please type something']"
                 type="text-area" />
                   </div>
                 <!-- frequency table actions -->
                 <div v-if="value==true" >                 
                 <br/> <span  class="text-weight-bold text-black" > 2. Frequency Table Ratings  </span><br/>
                  <span v-if="value==true"  class="text-bold text-blue-grey-10" >(i) Vertical: Ability to set objectives, achieve them, and solve problems.</span>
                <div v-for="(approach,index) in form.frequencytable" :key="index">
                  <div class="row">
                <div v-html="(index+1)+':'+''+approach"></div> <div><q-btn size="sm" flat icon="delete" color="orange" @click="deleteFreqitem(index)"/></div>
                  </div>
                </div>
                 <q-input 
                  
                    ref="freqtableInput"
                     v-if="value==true" 
                    v-model="form.frequencytable_vertical"
                    class="q-my-md"
                      label-color="black"
                     
                    filled autogrow  label="" 
                    hint="Vertical Scores: Ability to set objectives, achieve them, and solve problems">
                      <template v-slot:append>
                        <!-- <q-icon name="formated_list_bulleted" /> -->
                        <!-- <q-btn color="green" @click="addFreqtabletem()" label="add" icon-right="add"/> -->
                      </template>
                </q-input>
                 </div>
                 
              <!-- swot analysis -->
               <br/> <span v-if="value==true"  class="text-weight-bold text-blue-grey-10" >(ii)Horizontal: Capabilities of individuals, institutions, and society: </span><br/>
                  <span v-if="value==true"  class="text-italic" > </span>
                <div v-for="(swotItm,index) in form.swotActions" :key="index">
                  <div class="row">
                <div v-html="(index+1)+':'+''+swotItm"></div> <div><q-btn size="sm" flat icon="delete" color="orange" @click=" deleteSwotitem(index)"/></div>
                  </div>
                </div>
                 <q-input 
                    ref="swotInput"
                     v-if="value==true" 
                    v-model="form.frequencytable_horizontal"
                    class="q-my-md"
                      label-color="black"
                      
                    filled autogrow  label="" 
                    hint="Horizontal Scores: Capabilities of individuals, institutions, and society:">
                      <template v-slot:append>
                        <!-- <q-icon name="formated_list_bulleted" /> -->
                        <!-- <q-btn color="green" @click="addSwottem()" label="add" icon-right="add"/> -->
                      </template>
                </q-input>

                 


                  <br/> <span v-if="value==true"  class="text-weight-bolder text-black" >2.SWOT </span><br/>
                  <span v-if="value==true"  class="text-bold text-black" >(i)Suggested Actions </span>
                <div v-for="(swotItm,index) in form.swotActions" :key="index">
                  <div class="row">
                <div v-html="(index+1)+':'+''+swotItm"></div> <div><q-btn size="sm" flat icon="delete" color="orange" @click=" deleteSwotitem(index)"/></div>
                  </div>
                </div>
                 <q-input 
                    ref="swotInput"
                     v-if="value==true" 
                    v-model="form.swotItem"
                    class="q-my-md"
                      label-color="black"
                      
                    filled autogrow  label="" 
                    hint="Horizontal Scores: Capabilities of individuals, institutions, and society:">
                      <template v-slot:append>
                        <!-- <q-icon name="formated_list_bulleted" /> -->
                        <!-- <q-btn color="green" @click="addSwottem()" label="add" icon-right="add"/> -->
                      </template>
                </q-input>

                   <br/>
                  <br/> <span   class="text-weight-bolder text-black" > B) GROUP BRAINSTORMING ON RRI </span><br/>
                  <!-- <br/> <span v-if="value==true"  class="text-weight-bolder text-black" >2.SWOT </span><br/> -->
                  <span v-if="value==true"  class="text-bold text-black" >1. Feedback on brain Storm Session </span>
                <div v-for="(swotItm,index) in form.swotActions" :key="index">
                  <div class="row">
                <div v-html="(index+1)+':'+''+swotItm"></div> <div><q-btn size="sm" flat icon="delete" color="orange" @click=" deleteSwotitem(index)"/></div>
                  </div>
                </div>
                 <q-input 
                    ref="swotInput"
                     v-if="value==true" 
                    v-model="form.brainstormFeedback"
                    class="q-my-md"
                      label-color="black"
                      
                    filled autogrow  label=" Feedback on brain Storm Session" 
                    hint="">
                      <template v-slot:append>
                        <!-- <q-icon name="formated_list_bulleted" /> -->
                        <!-- <q-btn color="green" @click="addSwottem()" label="add" icon-right="add"/> -->
                      </template>
                </q-input>


                 
               

                  <!-- Assessment Results --> 
                 <!-- <span  class="text-weight-bold" >  Assessment Results </span><br/>
                 <q-editor v-model="form.message" min-height="5rem" /><br/> -->

                <!-- Frequency Table Ratings -->
                <!-- <span  class="text-weight-bold" >  Frequency Table Ratings and Suggested Actions </span><br/>
               <span  class="text-italic" > Type each recomended action and click add item to add it to the list</span>
                <div v-for="(approach,index) in form.frequencytable" :key="index">
                  <div class="row">
                <div v-html="(index+1)+':'+''+approach"></div> <div><q-btn size="sm" flat icon="delete" color="orange" @click="deleteSem(index)"/></div>
                  </div>
                </div>
                  <q-editor
                  
                    ref="approach"
                    v-model="form.frequencyItem  "
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
                  />
         -->
       <!-- <span>{{frequencyItem.length}} of 1000  </span> <br/> -->
          <!-- <span v-if="disAble==true" class="text-weight-bold text-red">You have  -->
        <!-- exceeded the limit click delete to remove characters <q-btn label="delete"  icon-right="delete" size="sm" @click="deleteItem()" /></span> -->
    
                 <!-- <br/>  <span v-if="value==true"  class="text-bold text-black" >1. Feedback on brain Storm Session </span> -->
          
                
                 <q-btn color="green" label="send as email " class="q-mx-md" @click="setEmailpopup(true)" icon-right="send"   />    
                <q-btn color="orange" label="download pdf "  @click="download()" icon-right="cloud_download"   />    
                </q-form>
            </q-card-section> 
                 <q-card-section>
                  <q-dialog v-model="emailDialogue">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Sending Email</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          Click confirm to send an email or cancell to close
          </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn   label="Confirm" color="green" @click="sendRaceremail()" />
          <q-btn flat label="Cancell" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
                 </q-card-section>
             </q-card>            
         </q-card-section>

      </q-card>
    </q-dialog>
  </div>
  

</template>

<script>
import createPdf from '../createpdf'
//import Notify from 'quasar' 
import {mapGetters} from 'vuex'
import racerResults from '../racerResults'
import brainStorm  from '../racerBrainstorm'
//import jsPDF from 'jspdf'
import  jsPDF  from 'jspdf'
import jsPDFtable from 'jspdf-autotable'
export default {
    
   components:{
     racerResults, brainStorm
   },
    props:['id'],
  data(){
      return {
        recEmails:"",
         value: true,
          dialog: false ,
          maximizedToggle: true,
          fixed: false,
          participantsEmails:'',
          form: {
              email:"",
              message:"",
              subject:"",
              redData:'',
              attach: false,
             
              resultsSummerry:'',
              frequencyItem:"",
              frequencytable_horizontal:"" ,
              frequencytable_vertical:"",
              swotActions:'',
               brainstormFeedback:"",

              frequencytable:[],
              swotActions:[],
              attachment: null
          },
      }
  }, 
 updated(){
      const y=  this.emails.toUpperCase()
      //console.log(y+'test')
      this.recEmails= y 
    // console.log(y+"test")
    // this.attach()
    //       const p= y.filter(v=> v['Timestamp']==this.singlePlcid) 
    //       this.form.email= p[0]['Email Address']
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
    emailDialogue:{
     get(){
     return this.$store.state.quarterReports.racerRespopup
     },
     set(val){
      this.$store.commit('quarterReports/SET_RACEREMAILPOPUP',val)
     }
   }
  },
  methods:{
    downloadItem(){
        const data ="this is some data"
     return  createPdf(data,doc.save('test.pdf'))
      },
    setEmailpopup(val){
      this.$store.commit('quarterReports/SET_RACEREMAILPOPUP',val)
     },
  //var pdf = doc.output();
  addFreqtabletem(){
      if(this.form.frequencyItem.length>0){
      const val = this.$refs.freqtableInput.value
      this.form.frequencytable.push(val)
      this.form.frequencyItem=""
      }else{
        this.$q.notify({
          message: 'Enter a Value, ',
          color: 'red'
        })
      }
    },
    addSwottem(){
      if(this.form.swotItem.length>0){
      const val = this.$refs.swotInput.value
      this.form.swotActions.push(val)
      this.form.swotItem=""
      }else{
        this.$q.notify({
          message: 'Enter a Value, ',
          color: 'red'
        })
      }
    },
    deleteFreqitem(index){
     this.form.frequencytable.splice(index,1)
    },
     deleteSwotitem(index){
     this.form.swotActions.splice(index,1)
    },
    sendRaceremail:function(){
         this.$refs.raceremailForm.validate().then( success=>{
              if(success){
            
        
        var listTostring=function(arr){
    var str = ''
    if(arr.length>0){
    for(var i= 0; i <arr.length ; i++){
        str+=(i+1)+":"+"  "+arr[i]+"\n \n"
    }
    return str
   }else{
       return str
     }
  };
     var lMargin=15; //left margin in mm
    var rMargin=15; //right margin in mm
    var pdfInMM=210;
        const doc = new jsPDF( "p","mm","a4")
        const participants= this.participants
        const assessmentRes= this.form.assessmentResult
        const docdata = this.racerRes
        const current = this.currentSession
        const totalpo =20
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
       doc.setFontSize(40)
       doc.setTextColor(0, 0, 255)
        doc.setFont("helvetica", "bolditalic");
        doc.text('RACERS', 75,15)

         doc.setFontSize(18)
       doc.setTextColor(0, 0, 255)
        doc.setFont("helvetica", "bold");
        doc.text('A Rapid Results Approach to Implementation', 35,23)
        doc.setFontSize(15)
         doc.text('Results, Adaptability, Competence, Efficiency, Rapidity, Selectivity',20,31)
       // doc.text(docdata['Email Address'], 10,20)
       //  doc.text(docdata['Name of Organisation'], 10,30)
        //var lines =doc.splitTextToSize(text,(10,15,210))
        doc.line(0,35,400,35)
        doc.setFontSize(11)
        doc.setFillColor(240, 241, 242);    
        doc.rect(10, 40, 190, 10, 'F'); 
        doc.setTextColor(5, 11, 41);
        doc.text(lMargin,46, 'Session Date:'+' '+current[0]['date'])
        // doc.text(11,28, 'Session Date'+' '+"current[0]['date']");
         doc.text(95,46, 'Session ID'+' '+current[0]['id']);
         doc.text(145,46, 'Participants:'+' '+ participants);
        // doc.text(176,28, 'Score:'+' '+total);
       
       // Title
        doc.setFontSize(12)       
        var paragraph= current[0]['title']
        var lines =doc.splitTextToSize(paragraph, (pdfInMM-lMargin-rMargin));
        doc.text(lMargin,60,lines);
        
        //Participants
        doc.setFontSize(12)
        doc.setFont("helvetica", "regular")
        doc.text(lMargin,75,'Participants:');
         var paragraph2= current[0]['participants']
          var lines2 =doc.splitTextToSize(paragraph2, (170-lMargin-rMargin))
        doc.text(lMargin+40,75,lines2);
        
         //objectives
         
        doc.text(lMargin,100,'Objectives:\n');
         var paragraph3= listTostring(current[0]['objectives'])
          var lines3 =doc.splitTextToSize(paragraph3, (170-lMargin-rMargin))
        doc.text(lMargin+40,100,lines3);

        //program topics
         doc.setFont("helvetica", "bold");
        doc.text(lMargin,160,'Discussion Topic(s) \n');
         doc.setFont("helvetica", "regular");
        var paragraph4=  listTostring(current[0]['topics'])
            var lines4 =doc.splitTextToSize(paragraph4, (200-lMargin-rMargin))
        doc.text(lMargin,165,lines4);

         //Suggestion Aproach
          doc.setFont("helvetica", "bold");
          doc.text(lMargin,195,'Suggested Approach');
           doc.setFont("helvetica", "regular");
        var paragraph5=  listTostring(current[0]['seminarApproach'])
         var lines5 =doc.splitTextToSize(paragraph5, (200-lMargin-rMargin))
        doc.text(lMargin,200,lines5);

       //
      

     //page  2
     //Assessment result
        doc.addPage()
         doc.setFont("helvetica", "bold");
          doc.text(lMargin,15,'Assessment Results');
           doc.setFont("helvetica", "bolditalic");
           doc.text(lMargin,25,`NOTE: A total   of ${participants} participants completed and submited the assessment.`);
           doc.setFont("helvetica", "regular");
        //  var paragraph9= "After the Power Point Presentations and a short discussion, participants were requested to complete the assessment tool, but could not be finished since many participants did not access to good internet. It was agreed that the results would be shared and if participants are available, a session can be held (an hour or so) to discuss its application to the production of a 100 day plan to kickstart the project, However, participants can do so on their own by following the PPP materials and then share the results. Below are the results from those who completed the assessment (with 5 recommended group actions)"
      var paragraph5   = this.form.resultsSummerry
         // doc.fromHTML(paragraph5, 15, 20, {'width': 180});

      var lines5 =doc.splitTextToSize(paragraph5, (200-lMargin-rMargin))
        doc.text(lMargin,35,lines5);

         doc.setFont("helvetica", "bold");
          doc.text(lMargin,80,'Scoring CE variables');
          doc.setFont("helvetica", "regular");
          doc.text(lMargin,85,'On a scale on 1-5, participants should score elements under each CE variable using an online tool');
         doc.setFillColor(240, 241, 242);    
         doc.rect(10, 90, 190, 10, 'F');  
         doc.text(lMargin,96, '1= Cannot Be Rated;'+'   '+''+'2= Poor;'+'   '+'3= Average;'+'   '+'4= Good;'+'   '+'5= Best Practice')
        // doc.text(11,28, 'Session Date'+' '+"current[0]['date']");
         doc.setFont("helvetica", "bold");
          doc.text(lMargin,110,'Frequency Table');

         jsPDFtable( doc ,{
          head: [['LEVEL ' , 'Setting Objectives',"Archieving Objectives",'Solving Problems,','Total']],
          margin: {top:120},
          body: [['Individual:',docdata[0],docdata[1],docdata[2],indTotal],
                 ['Institution:',docdata[3],docdata[4],docdata[5],instTotal],
                 ['Society:',docdata[6],docdata[7],docdata[8],socTotal],
                 ['Total:',totalSet,totalArch,totalSolv,total]
                  ],
        //          
        })
         //possible actions
         doc.setFont("helvetica", "bold");
        doc.text(lMargin,170,'Possible actions from tabulated score above  ');
          
        var paragraph6= "\n A (12+) : Focus on success factors . \n B (9-12) : Identify improvements to be made \n C(3-8) : Assess need for radical change"//'Session Date:'+' '+"current[0]['date']")
        var lines6 =doc.splitTextToSize(paragraph6, (200-lMargin-rMargin))
        doc.text(lMargin,175,lines6);
        
        //ratings and suggested actions
        doc.setFont("helvetica", "bold");
        doc.text(lMargin,200,'Ratings and Suggested Actions');
         doc.setFont("helvetica", "regular"); 
        var paragraph7= listTostring(this.form.frequencytable)
        var lines7 =doc.splitTextToSize(paragraph7, (200-lMargin-rMargin))
        doc.text(lMargin,205,lines7);
      
      //page 3
       doc.addPage()

      //title 
       doc.setFont("helvetica", "bold");
        doc.text(lMargin,20,'SWOT Results and  Review');

         //ratings and suggested actions
        doc.setFont("helvetica", "bold");
        doc.text(lMargin,200,'Ratings and Suggested Actions');
         doc.setFont("helvetica", "regular"); 
        var paragraph9= listTostring(this.form.swotActions)
        var lines9 =doc.splitTextToSize(paragraph9, (200-lMargin-rMargin))
        doc.text(lMargin,205,lines9); 

      //swot table
       doc.setFontSize(18)
        doc.text(100,45, 'S');
        doc.text(15,80, 'O');
        doc.text(185,80, 'T');
        doc.text(100,110, 'W');

      if(72<=total && total<=90){
          doc.setFontSize(11)
        doc.text(11,30, `Session Summary: The score for this session was :${total} which is in  the 1st Quadrant`);   
        doc.setFontSize(11)
        doc.setFillColor(240, 241, 242);  
       
         doc.rect(101, 50, 60, 25, 'F'); 
        doc.rect(101, 76, 60, 25, 'F')
        doc.rect(40, 76, 60, 25, 'F')
        doc.setFillColor(12, 199, 6);         
        doc.rect(40, 50, 60, 25, 'F')

        doc.setTextColor(5, 11, 41);
        doc.text(110,85, 'IV (18-35)');
        
        doc.text(110,70, 'II (54-71)');
        doc.text(80,85, 'III (36-53)');
        doc.setTextColor(255, 255, 255);
        doc.text(80,70, 'I (72-90)');

        }else if(54<=total && total<=71){
        doc.setFontSize(11)
        doc.text(11,30, `Session Summary: The score for this session was :${total} which is in  the 2nd Quadrant`);   
        doc.setFontSize(11)
        doc.setFillColor(240, 241, 242);    
        doc.rect(40, 50, 60, 25, 'F'); 
        doc.rect(101, 76, 60, 25, 'F')
        doc.rect(40, 76, 60, 25, 'F')
        doc.setFillColor(12, 199, 6); 
        
        doc.rect(101, 50, 60, 25, 'F')

        doc.setTextColor(5, 11, 41);
        doc.text(80,70, 'I (72-90)');
       
        doc.text(80,85, 'III (36-53)');
        doc.text(110,85, 'IV (18-35)');
        doc.setTextColor(255, 255, 255);
         doc.text(110,70, 'II (54-71)');

        }
        else if(36<=total && total<=53){
        doc.setFontSize(11)
       doc.text(11,30, `Session Summary: The score for this session was :${total} which is in  the 3rd Quadrant`);   
     doc.setFontSize(11)
        doc.setFillColor(240, 241, 242);    
        doc.rect(40, 50, 60, 25, 'F'); 
        doc.rect(101, 50, 60, 25, 'F')
        doc.rect(101, 76, 60, 25, 'F')
        doc.setFillColor(12, 199, 6); 
        
        doc.rect(40, 76, 60, 25, 'F')

        doc.setTextColor(5, 11, 41);
        doc.text(80,70, 'I (72-90)');
        doc.text(110,70, 'II (54-71)');
        
         doc.text(110,85, 'IV (18-35)');
        doc.setTextColor(255, 255, 255);
       doc.text(80,85, 'III (36-53)');
        }
         else if(18<=total && total<=35){
        doc.setFontSize(11)
        doc.text(11,30, `Session Summary: The score for this session was :${total} which is in  the 4th Quadrant`);   
        doc.setFontSize(11)
        doc.setFillColor(240, 241, 242);    
        doc.rect(40, 50, 60, 25, 'F'); 
        doc.rect(101, 50, 60, 25, 'F')
        doc.rect(40, 76, 60, 25, 'F')
        doc.setFillColor(12, 199, 6); 
        doc.rect(101, 76, 60, 25, 'F')
        
        doc.setTextColor(5, 11, 41);
        doc.text(80,70, 'I (72-90)');
        doc.text(110,70, 'II (54-71)');
        doc.text(80,85, 'III (36-53)');
        doc.setTextColor(255, 255, 255);
        doc.text(110,85, 'IV (18-35)');
     }
       // doc.setDrawColor(242, 242, 242); 
       
        
      
      
    
           var  pdfAtt =   btoa(doc.output())
          this.form.redData = pdfAtt
          console.log(pdfAtt)
        
           const data= this.form 
           data.redData =  pdfAtt 
                 // var r = this.download()
         console.log(data.redData)
         this.$store.dispatch('quarterReports/racerEmail', data )
          this.$refs.raceremailForm.reset() 
          this.$refs.raceremailForm.resetValidation()   
       }else{
              alert("err")
       }
         }).catch(err=>{
              console.log(err.msg)
         }) 
      },
      
      download(){
      //   var jsPDF = require('jspdf')
     //    var jsPDFtable = require('jspdf-autotable')
    
        var listTostring=function(arr){
    var str = ''
    if(arr.length>0){
    for(var i= 0; i <arr.length ; i++){
        str+=(i+1)+":"+"  "+arr[i]+"\n \n"
    }
    return str
   }else{
       return str
     }
  };
     var lMargin=15; //left margin in mm
    var rMargin=15; //right margin in mm
    var pdfInMM=210;
        const doc = new jsPDF( "p","mm","a4")
        const participants= this.participants
        const assessmentRes= this.form.assessmentResult
        const docdata = this.racerRes
        const current = this.currentSession
        const totalpo =20
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
       doc.setFontSize(40)
       doc.setTextColor(0, 0, 255)
        doc.setFont("helvetica", "bolditalic");
        doc.text('RACERS', 75,15)

         doc.setFontSize(18)
       doc.setTextColor(0, 0, 255)
        doc.setFont("helvetica", "bold");
        doc.text('A Rapid Results Approach to Implementation', 35,23)
        doc.setFontSize(15)
         doc.text('Results, Adaptability, Competence, Efficiency, Rapidity, Selectivity',20,31)
       // doc.text(docdata['Email Address'], 10,20)
       //  doc.text(docdata['Name of Organisation'], 10,30)
        //var lines =doc.splitTextToSize(text,(10,15,210))
        doc.line(0,35,400,35)
        doc.setFontSize(11)
        doc.setFillColor(240, 241, 242);    
        doc.rect(10, 40, 190, 10, 'F'); 
        doc.setTextColor(5, 11, 41);
        doc.text(lMargin,46, 'Session Date:'+' '+current[0]['date'])
        // doc.text(11,28, 'Session Date'+' '+"current[0]['date']");
         doc.text(95,46, 'Session ID'+' '+current[0]['id']);
         doc.text(145,46, 'Participants:'+' '+ participants);
        // doc.text(176,28, 'Score:'+' '+total);
       
       // Title
        doc.setFontSize(12)       
        var paragraph= current[0]['title']
        var lines =doc.splitTextToSize(paragraph, (pdfInMM-lMargin-rMargin));
        doc.text(lMargin,60,lines);
        
        //Participants
        doc.setFontSize(12)
        doc.setFont("helvetica", "regular")
        doc.text(lMargin,75,'Participants:');
         var paragraph2= current[0]['participants']
          var lines2 =doc.splitTextToSize(paragraph2, (170-lMargin-rMargin))
        doc.text(lMargin+40,75,lines2);
        
         //objectives
         
        doc.text(lMargin,100,'Objectives:\n');
         var paragraph3= listTostring(current[0]['objectives'])
          var lines3 =doc.splitTextToSize(paragraph3, (170-lMargin-rMargin))
        doc.text(lMargin+40,100,lines3);

        //program topics
         doc.setFont("helvetica", "bold");
        doc.text(lMargin,160,'Discussion Topic(s) \n');
         doc.setFont("helvetica", "regular");
        var paragraph4=  listTostring(current[0]['topics'])
            var lines4 =doc.splitTextToSize(paragraph4, (200-lMargin-rMargin))
        doc.text(lMargin,165,lines4);

         //Suggestion Aproach
          doc.setFont("helvetica", "bold");
          doc.text(lMargin,195,'Suggested Approach');
           doc.setFont("helvetica", "regular");
        var paragraph5=  listTostring(current[0]['seminarApproach'])
         var lines5 =doc.splitTextToSize(paragraph5, (200-lMargin-rMargin))
        doc.text(lMargin,200,lines5);

       //
      

     //page  2
     //Assessment result
        doc.addPage()
         doc.setFont("helvetica", "bold");
          doc.text(lMargin,15,'Assessment Results');
           doc.setFont("helvetica", "bolditalic");
           doc.text(lMargin,25,`NOTE: A total   of ${participants} participants completed and submited the assessment.`);
           doc.setFont("helvetica", "regular");
        //  var paragraph9= "After the Power Point Presentations and a short discussion, participants were requested to complete the assessment tool, but could not be finished since many participants did not access to good internet. It was agreed that the results would be shared and if participants are available, a session can be held (an hour or so) to discuss its application to the production of a 100 day plan to kickstart the project, However, participants can do so on their own by following the PPP materials and then share the results. Below are the results from those who completed the assessment (with 5 recommended group actions)"
      var paragraph5   = this.form.resultsSummerry
         // doc.fromHTML(paragraph5, 15, 20, {'width': 180});

      var lines5 =doc.splitTextToSize(paragraph5, (200-lMargin-rMargin))
        doc.text(lMargin,35,lines5);

         doc.setFont("helvetica", "bold");
          doc.text(lMargin,80,'Scoring CE variables');
          doc.setFont("helvetica", "regular");
          doc.text(lMargin,85,'On a scale on 1-5, participants should score elements under each CE variable using an online tool');
         doc.setFillColor(240, 241, 242);    
         doc.rect(10, 90, 190, 10, 'F');  
         doc.text(lMargin,96, '1= Cannot Be Rated;'+'   '+''+'2= Poor;'+'   '+'3= Average;'+'   '+'4= Good;'+'   '+'5= Best Practice')
        // doc.text(11,28, 'Session Date'+' '+"current[0]['date']");
         doc.setFont("helvetica", "bold");
          doc.text(lMargin,110,'Frequency Table');

         jsPDFtable( doc ,{
          head: [['LEVEL ' , 'Setting Objectives',"Archieving Objectives",'Solving Problems,','Total']],
          margin: {top:120},
          body: [['Individual:',docdata[0],docdata[1],docdata[2],indTotal],
                 ['Institution:',docdata[3],docdata[4],docdata[5],instTotal],
                 ['Society:',docdata[6],docdata[7],docdata[8],socTotal],
                 ['Total:',totalSet,totalArch,totalSolv,total]
                  ],
        //          
        })
         //possible actions
         doc.setFont("helvetica", "bold");
        doc.text(lMargin,170,'Possible actions from tabulated score above  ');
          
        var paragraph6= "\n A (12+) : Focus on success factors . \n B (9-12) : Identify improvements to be made \n C(3-8) : Assess need for radical change"//'Session Date:'+' '+"current[0]['date']")
        var lines6 =doc.splitTextToSize(paragraph6, (200-lMargin-rMargin))
        doc.text(lMargin,175,lines6);
        
        //ratings and suggested actions
        doc.setFont("helvetica", "bold");
        doc.text(lMargin,200,'Ratings and Suggested Actions');
         doc.setFont("helvetica", "regular"); 
        var paragraph7= listTostring(this.form.frequencytable)
        var lines7 =doc.splitTextToSize(paragraph7, (200-lMargin-rMargin))
        doc.text(lMargin,205,lines7);
      
      //page 3
       doc.addPage()

      //title 
       doc.setFont("helvetica", "bold");
        doc.text(lMargin,20,'SWOT Results and  Review');

         //ratings and suggested actions
        doc.setFont("helvetica", "bold");
        doc.text(lMargin,200,'Ratings and Suggested Actions');
         doc.setFont("helvetica", "regular"); 
        var paragraph9= listTostring(this.form.swotActions)
        var lines9 =doc.splitTextToSize(paragraph9, (200-lMargin-rMargin))
        doc.text(lMargin,205,lines9); 

      //swot table
       doc.setFontSize(18)
        doc.text(100,45, 'S');
        doc.text(15,80, 'O');
        doc.text(185,80, 'T');
        doc.text(100,110, 'W');

      if(72<=total && total<=90){
          doc.setFontSize(12)
        doc.text(lMargin,30, `Session Summary: The score for this session was :${total} which is in  the 1st Quadrant`);   
      doc.setFont("helvetica", "bold");
      doc.text(lMargin,170,'Suggested Actions to Maintain cohesion with a visionary leadership');
       doc.setFontSize(11)
        doc.setFillColor(240, 241, 242);  
       
         doc.rect(101, 50, 60, 25, 'F'); 
        doc.rect(101, 76, 60, 25, 'F')
        doc.rect(40, 76, 60, 25, 'F')
        doc.setFillColor(12, 199, 6);         
        doc.rect(40, 50, 60, 25, 'F')

        doc.setTextColor(5, 11, 41);
        doc.text(110,85, 'IV (18-35)');
        
        doc.text(110,70, 'II (54-71)');
        doc.text(80,85, 'III (36-53)');
        doc.setTextColor(255, 255, 255);
        doc.text(80,70, 'I (72-90)');

        }else if(54<=total && total<=71){
        doc.setFontSize(11)
        doc.text(lMargin,30, `Session Summary: The score for this session was :${total} which is in  the 2nd Quadrant`);  
           doc.text(lMargin,170,'Suggested Actions to Understand and maintain advantages');
      
        doc.setFontSize(11)
        doc.setFillColor(240, 241, 242);    
        doc.rect(40, 50, 60, 25, 'F'); 
        doc.rect(101, 76, 60, 25, 'F')
        doc.rect(40, 76, 60, 25, 'F')
        doc.setFillColor(12, 199, 6); 
        
        doc.rect(101, 50, 60, 25, 'F')

        doc.setTextColor(5, 11, 41);
        doc.text(80,70, 'I (72-90)');
       
        doc.text(80,85, 'III (36-53)');
        doc.text(110,85, 'IV (18-35)');
        doc.setTextColor(255, 255, 255);
         doc.text(110,70, 'II (54-71)');

        }
        else if(36<=total && total<=53){
        doc.setFontSize(11)
       doc.text(11,30, `Session Summary: The score for this session was :${total} which is in  the 3rd Quadrant`);   
     doc.setFontSize(11)
        doc.setFillColor(240, 241, 242);    
        doc.rect(40, 50, 60, 25, 'F'); 
        doc.rect(101, 50, 60, 25, 'F')
        doc.rect(101, 76, 60, 25, 'F')
        doc.setFillColor(12, 199, 6); 
        
        doc.rect(40, 76, 60, 25, 'F')

        doc.setTextColor(5, 11, 41);
        doc.text(80,70, 'I (72-90)');
        doc.text(110,70, 'II (54-71)');
        
         doc.text(110,85, 'IV (18-35)');
        doc.setTextColor(255, 255, 255);
       doc.text(80,85, 'III (36-53)');
        }
         else {
        doc.setFontSize(12)
        doc.text(lMargin,30, `Session Summary: The score for this session was :${total} which is in  the 4th Quadrant`);
        doc.text(lMargin,30, `Session Summary: The score for this session was :${total} which is in  the 4th Quadrant`);   
        doc.setFontSize(11)
        doc.setFillColor(240, 241, 242);    
        doc.rect(40, 50, 60, 25, 'F'); 
        doc.rect(101, 50, 60, 25, 'F')
        doc.rect(40, 76, 60, 25, 'F')
        doc.setFillColor(12, 199, 6); 
        doc.rect(101, 76, 60, 25, 'F')
        
        doc.setTextColor(5, 11, 41);
        doc.text(80,70, 'I (72-90)');
        doc.text(110,70, 'II (54-71)');
        doc.text(80,85, 'III (36-53)');
        doc.setTextColor(255, 255, 255);
        doc.text(110,85, 'IV (18-35)');
     }
       // doc.setDrawColor(242, 242, 242); 
       doc.addPage()
        doc.setFont("helvetica", "bold");
        doc.text(lMargin,200,'Ratings and Suggested Actions');
         doc.setFont("helvetica", "regular"); 
        var paragraph7= listTostring(this.form.frequencytable)
        var lines7 =doc.splitTextToSize(paragraph7, (200-lMargin-rMargin))
        doc.text(lMargin,205,lines7);

         
      
     // var  pdfAtt =   btoa(doc.output())
     //  this.form.redData = pdfAtt
        doc.save(`racer_.pdf`)
      }
    },
     
    
  
  
}
</script>

<style>

</style>