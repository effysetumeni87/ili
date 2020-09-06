import axios from 'axios'
import {firebaseDb } from 'boot/firebase'
import {fbFunctions} from "boot/firebase";
import { Notify } from 'quasar'
const quarterReports  ={
   namespaced: true,
    state:{
     racerRespopup: false,
     loadingRacer:false,      
     plcRes:[],
     racerRes:[],
     preplcRes:[],
     pecogoRes:[],
     hscm1 :[],
     
      hscm1Users: 0,
      participants: 0,
      pecogoParticipants:0,
      plcParticipants:0,
      preplcParticipants:0,
      emails: [],
      
     
      loading:false,
      racer:[],
      oneSession:[],
      racerDialog: false,
      preplcDialog:false,
      plcDialog:false,
      pecogoDialogue:false,
      popUp1: false,
      popUp2: false,
      popUp3: false,
      currentSession: "",
      sessions:[],
      preplcReports:[],
      iecReports:[],
       quarterReports: [] ,
      //  loading : false,
       individualReports :[]
    },
    actions: {
     async deleteSession({commit},payload){
       commit ('Loading',true)
       //console.log(payload)
       try{
           const delrec = await  firebaseDb.collection('sessions').doc(payload).delete()
           Notify.create({
               message: 'item succesfuly deleted',
               color: 'orange'
             })
             commit ('Pop_UP1',false)
             commit ('Loading',false)
       }
       catch(err){
           console.log(err.message)
       }
   },
   async getSession({commit ,dispatch}, payload){
     commit('Loading',true)
     try {
       let sessions=   await firebaseDb.collection('sessions').where("id","==",payload).onSnapshot(snap=>{
           const oneSession =[]
           snap.forEach(element => {                       
             let session = element.data() 
             session.docId = element.id  
                     
             oneSession.push(session)
                });
                console.log('oneSession')
                console.log(oneSession)
  commit('ONE_SESSION',oneSession)
  commit('Loading',false)
//  dispatch('getpreplc')
 // dispatch('getIEC')
       })
     }
     catch(err){
       console.log(err.message)
     }
},
     async getSessions({commit ,dispatch} ){
           try {
             let sessions=   await firebaseDb.collection('sessions').orderBy('date','desc').onSnapshot(snap=>{
                 const allSessions =[]
                 snap.forEach(element => {                       
                   let session = element.data() 
                   session.docId = element.id  
                           
                   allSessions.push(session)
                      });
                    //  console.log(allSessions)
        commit('ADD_SESSIONS',allSessions)
      //  dispatch('getpreplc')
        //dispatch('getIEC')
     //   dispatch('getRacer')
             })
           }
           catch(err){

           }
     },
     async editSession({commit ,dispatch} ,payload){
       try {
        let reports = await firebaseDb.collection('sessions').doc(payload.docId).set(payload,{merge:true})
        //console.log(reports.data)
        //let reportsData = reports.data
        Notify.create({
         message: 'Session sucessfully edited , ',
         color: 'green'
       })
        dispatch ('updateEmails',payload)
        commit ('Pop_UP2',false)
        this.$router.back()
       }
       catch(err) {
         console.log(err.message)
         Notify.create({
          message: err.message,
          color: 'orange'
        })
       }
     },
     async newSession({commit ,dispatch} ,payload){
       try {
        let reports = await firebaseDb.collection('sessions').add(payload)
        //console.log(reports.data)
       // let reportsData = reports.data
        Notify.create({
         message: 'Session sucessfully created , ',
         color: 'green'
       })
        dispatch ('createSessionemail',payload)
        commit ('Pop_UP1',false)
       }
       catch(err) {
         console.log(err.message)
       }
     },
     createSessionemail({commit},payload){
      var sendMessages = fbFunctions.httpsCallable("createSession");

      var data = payload;

      sendMessages(data)
    },
       
     updateEmails({commit},payload){
       var sendMessages = fbFunctions.httpsCallable("updateEmails");

       var data = payload;

       sendMessages(data)
     },
     racerEmail({commit},payload){
       var sendMessages = fbFunctions.httpsCallable("racerEmail");

       var data = payload;

       sendMessages(data)
       commit('SET_RACEREMAILPOPUP',false)
     },
     async getHSCM1({commit},payload){
       commit('SET_LOADINGRACER',true)
       try {
        let hscm1rReports = await axios.get(`https://sheet.best/api/sheets/422aa5f9-7446-4534-8163-28cef6e4fcef/1.%20Program%20ID:/${payload}`)
          const data = hscm1rReports.data
          const users = data.length
          commit('SET_HSCM1',data)
          commit('SET_HSCM1USERS',users)
       }
       catch(err){
        console,log(err.message)
       }
     },
     async getRacer({commit},payload){
      commit('SET_LOADINGRACER',true)
      try {
       let racerReports = await axios.get(`https://sheet.best/api/sheets/68b30f4e-71ce-455f-b85b-1c90fdb07361/Session%20ID/${payload}`)
    
      }
      catch(err){
        console.log(err.message)
      }
    },
     async getRacer({commit},payload){
       commit('SET_LOADINGRACER',true)
       try {
        let racerReports = await axios.get(`https://sheet.best/api/sheets/68b30f4e-71ce-455f-b85b-1c90fdb07361/Session%20ID/${payload}`)
    
    var calcRes = function(arr){
       var   res = []
       var d  = 0
       var b= 0
       var c= 0
       var e = 0 
       var f = 0 
       var g = 0 
       var h = 0 
       var j = 0 
       var k = 0
        //4 ,4 ,5 ,4,4  ,3,4,3, 4

        console.log("length"+" " +arr.length)
       for( var i= 0; i<arr.length ; i++ ){
         if(0<=i && i<=3){
           if(arr[i]!==""){
             var num= (parseInt((arr[i]))/4)
             var resq = num
             b+= resq
           }
         }
         else if(4<=i && i<=7){
           if(arr[i]!==""){
             var num= (parseInt((arr[i]))/4)
             var resq = num
             c+= resq
           }
         }
         else if(8<=i && i<=12){
           if(arr[i]!==""){
             var num= (parseInt((arr[i]))/5)
             var resq = num
             d+= resq
           }
         }
         else if(13<=i && i<=16){
           if(arr[i]!==""){
             var num= (parseInt((arr[i]))/4)
             var resq = num
             e+= resq
           }
         }
         else if(17<=i && i<=20){
           if(arr[i]!==""){
             var num= (parseInt((arr[i]))/4)
             var resq = num
             f+= resq
           }
         }
         else if(21<=i && i<=23){
           if(arr[i]!==""){
             var num= (parseInt((arr[i]))/3)
             var resq = num
             g+= resq
           }
         }
         else if(24<=i && i<=27){
           if(arr[i]!==""){
             var num= (parseInt((arr[i]))/4)
             var resq = num
             h+= resq
           }
         }
         else if(28<=i && i<=30){
           if(arr[i]!==""){
             var num= (parseInt((arr[i]))/3)
             var resq = num
             j+= resq
           }
         }
         else if(31<=i && i<=33){
           if(arr[i]!==""){
             var num= (parseInt((arr[i]))/4)
             var resq = num
             k+= resq
           }
         }
         
       }
    res.push(b,c,d,e,f,g,h,j,k)
      
        return res
    }
   
    
        let reportsData = racerReports.data
        if(reportsData.length > 0){
        let emails = reportsData.map(x=>x['Email Address'])
        let data = reportsData.map((x,index,arr)=>{
          let y = Object.values(x)
          let m =y.slice(3,y.length)
          return calcRes( m )
        
        })
       // console.log (emails)
        const resArr = [] 
        var a=[],
        b=data.length,c=[],d=[]
        const arrayColumn = (arr, n) => arr.map(x => x[n]);
        arrayColumn(data,0)
        for(var i = 0 ; i<data[0].length ; i++){
         
       //  for (var y =0 ; y<data[i].length; y++){
             // if(y==0){
             //   a.push(data[i][y])
             // }
            var u=  (arrayColumn(data,i).reduce((acc,n)=>{return acc + n;})/b).toFixed(2)
            a.push(u)
        // }
        }
        console.log (a)
        commit ('SET_EMAILS',emails)
        commit ('SET_RACER_RESULTS',a)
        commit ('SET_PARTICIPANTS',b)
        commit('SET_LOADINGRACER',false)
       }
        else{
          var res =[]
         commit ('SET_EMAILS',"")
         commit ('SET_RACER_RESULTS',res)
         commit ('SET_PARTICIPANTS',0)
         commit('SET_LOADINGRACER',false)
        }
       }
       catch(err) {
         console.log(err.message)
       }
     },
     async getpreplc({commit}){
       commit('SET_LOADINGRACER',true)
       try {
        let reports = await axios.get('https://sheet.best/api/sheets/422aa5f9-7446-4534-8163-28cef6e4fcef')
       // console.log(reports.data)
        let reportsData = reports.data
        commit ('SET_PREPLC',reportsData)
       }
       catch(err) {
         console.log(err.message)
       }
     },
     //  async getIEC({commit}){
     //    try {
     //     let reports = await axios.get('https://sheetdb.io/api/v1/hs4ivb4u8jiq1')
     //     console.log(reports.data)
     //     let reportsData = reports.data
     //     commit ('SET_IEC',reportsData)
     //    }
     //    catch(err) {
     //      console.log(err.message)
     //    }
     //  },
      async getQuarterlyReports ({commit}){
            try {
              commit('LOADING', true)
              let reports = await axios.get('https://sheetdb.io/api/v1/78enzb7g1wtxd')
              let quaterReportsData = reports.data.filter(x=>x["Select quarter"]=="Second Quarter 2020") 
           //    console.log(quaterReportsData)
              let tes = ()=>{
               let y= Object.keys(quaterReportsData[2])
               return y
              }
             //  let ans =(i) => {
             //   let v= Object.keys(quaterReportsData[i])
             //   return v
             //  }

              var newOb = {}
              var resARR = []
              var ques = tes().slice(16,tes().length)
              console.log(ques)
              for( var i=0 ;i<ques.length ; i++){
               var iTest  = [
                {question:newOb['question'+[i+1]] = ques[i]} ,
                {answers:newOb['answers'+[i+1]]=  quaterReportsData.map(x=>x[ques[i]]) } 
               ]
                resARR .push(iTest)  
               // console.log(iTest)            
              }
              //new indidual data

              var  individualOrg=[]
             // var  responseData = quaterReportsData.slice(0,6)
              console.log("resARR")
              for( var i=0 ;i<quaterReportsData.length ; i++){
                
               var  org = quaterReportsData[i]['NAME OF REPORTING ORGANISATION'].toLowerCase()
             //  var dataArray   = Object.entries(quaterReportsData[i])  //.slice(0,6)
               var ansArray   = Object.entries(quaterReportsData[i])  //.slice(5,Object.entries(quaterReportsData[i]).length)    
               var orgDetails ={
                  reportData: "dataArray",
                  name : org,
                  Response: ansArray
                }
                individualOrg.push(orgDetails)
              }
            
              
               
              commit('SET_REPORTS', resARR)
              commit('SET_INDIVIDUAL', individualOrg)
             
            }
            catch(err){
               console.log(err.message)
            }
      }
    },
    mutations:{
      SET_RACEREMAILPOPUP(state,payload){
        state.racerRespopup = payload
      },
     SET_LOADINGRACER(state,payload){
       state.loadingRacer = payload
    },
     SET_HSCM1(state,payload){
        state.hscm1 = payload
     },
     SET_HSCM1USERS(state,payload){
       state.hscm1Users = payload
    },
     SET_EMAILS(state,payload){
       state.emails = payload 
     },
     SET_PARTICIPANTS(state,payload){
       state.participants = payload
     },
      SET_RACER_RESULTS(state,payload){
        state.racerRes = payload
      },
      Loading(state,payload){
       state.loading =payload
     },
     ONE_SESSION(state,payload){
       state.oneSession =payload
     },
     Pop_UP1(state,payload){
       state.popUp1 =payload
     },
     Pop_UP2(state,payload){
       state.popUp2 =payload
     },
     Pop_UP3(state,payload){
       state.popUp3 =payload
     },
     CURRENT_SESSION(state,payload){
       state.currentSession =payload
     },
     ADD_SESSIONS(state,payload){
       state.sessions =payload
     },
     SET_PREPLC(state,payload){
       state.preplcReports =payload
     },
     SET_IEC(state,payload){
       state.iecReports =payload
     },
        LOADING(state, payload){
               state.loading = payload    
       },
        SET_REPORTS(state , resARR){
            state.quarterReports = resARR
          //  console.log(state.quarterReports)
        },
        SET_INDIVIDUAL(state , individualOrg){
         state.individualReports = individualOrg
       //  console.log(state.quarterReports)
     }
    },
    getters:{
     prePLC(state){
       return state.sessions.filter(x=>x.type=="pre_plc") 
    },
    PLC(state){
     return state.sessions.filter(x=>x.type=="full_plc") 
  },
   racer(state){
   return state.sessions.filter(x=>x.type=="racer") 
},
pecogo(state){
 return state.sessions.filter(x=>x.type=="pecogo") 
},
other(state){
 return state.sessions.filter(x=>x.type=="other") 
},
current(state){
 return state.sessions.filter(x=>x.id==state.currentSession) 
},
    all(state){
     return state.sessions 
  },
  Emails(state){
   return state.emails.toString() 
},
racerRes(state){
 return state.racerRes
},
Racerparticipants(state){
 return state.participants
},
plcParticipants(state){
 return state.participants
},
preplcParticipants(state){
 return state.participants
},
participants(state){
 return state.participants
},
hscmpreplcParticipants(state){
 return state.hscm1Users
},
pecogoParticipants(state){
 return state.participants
},
currentSession(state){
  return state.oneSession
 },
    }
}

export default quarterReports