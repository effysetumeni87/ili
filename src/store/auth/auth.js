import {firebaseAuth } from 'boot/firebase'
import {fbFunctions} from "boot/firebase";
import {firebaseDb } from 'boot/firebase'
import {Notify} from 'quasar'
const auth = {
namespaced: true,
state: {
   users:[],
    user: {
        
    },
    userRole:{

    },
    loading: false,
    logginIn:false,
    loggedIn:false,
    modal:false

},

mutations:{
  SET_USERS(state , payload){
    state.users = payload
  },
  SET_MODAL(state , payload){
    state.modal = payload
  },
    SET_LOADING(state , payload){
        state.loading = payload
    },
    SET_PROFILE(state ,profileData){
        state.user =profileData
    },
    SET_LOGIN(state , payload){
        state.loggedIn = payload
    },
    SET_USERROLES (state, payload){
        state.userRole= payload
    },
    SET_LOGOUT(state){
        state.user = {},
        state.userRole = {},
        state.loggedIn = false
    }
},

actions:{
  
  async getUsers({commit}){
    try{               
      var comments = await firebaseDb
      .collection('userProfiles')       
      .onSnapshot(snap => {
        let profileData = []
         snap.forEach(element => {                       
              let task = element.data() 
              task.docid = element.id  
                      
              profileData.push(task)
                 });
               
      console.log(profileData )
      commit('SET_USERS', profileData )

 
      });
      
 }
    
    catch(err){
      console.log(err.message)
    }
  },

  handleAuthStateChange({commit, dispatch}){
    firebaseAuth.onAuthStateChanged(user => {
      if(user){
        dispatch('setProfiles')
        commit('SET_LOGIN', true)
        localStorage.setItem('loggedIn', true)
         
      }else{
        commit('SET_LOGIN', false);
        localStorage.getItem('loggedIn', false)
      }
    })
  },
  async resetPassword({commit}, data){
    console.log(data)
      try {
          var _ = await firebaseAuth.sendPasswordResetEmail(data.email)
          Notify.create({
            message: '!!check your email to reset password ',
            color: 'green'
          })
       }
      catch(err){
          console.log(err.message)
      }
  },
  async setProfiles({commit}){
       try{
        const userdata= await firebaseAuth.currentUser.getIdTokenResult()         
        const userProfile = await firebaseDb.collection('userProfiles').where("id","==",userdata.claims.user_id).get() 
        let profileData = {}
          userProfile.forEach(element => {
          profileData = element.data()                
          })
         //console.log(profileData)
         commit('SET_PROFILE', profileData)
         commit('SET_LOGIN' , true)
         commit('SET_USERROLES',userdata.claims)
       }
       catch(err){
         console.log(err.message)
       }
  },
async userLogin({commit}, loginData){
      
     try{
         commit('SET_LOADING',true)
         const user = await firebaseAuth.signInWithEmailAndPassword(loginData.email, loginData.password)
         const userdata= await firebaseAuth.currentUser.getIdTokenResult()         
          const userProfile = await firebaseDb.collection('userProfiles').where("id","==",user.user.uid).get() 
         //console.log(user.user.uid)
         console.log(userdata.claims)
          let profileData = {}
          userProfile.forEach(element => {
          profileData = element.data()                
          })
         //console.log(profileData)
         commit('SET_PROFILE', profileData)
         commit('SET_LOGIN' , true)
         commit('SET_USERROLES',userdata.claims)
         commit('SET_LOADING',false)
         this.$router.push('/home')
     }
     catch(err){
        console.log( err.message );
        Notify.create({
            message: '!! could not login  , try again ',
            color: 'red'
          })
          commit('SET_LOADING',false)           
     }
},
async logoutUser({commit}){
      try{
        commit('SET_LOADING',true)
         var _ =  await firebaseAuth.signOut() 
         commit('SET_LOGOUT')
         this.$router.push('/')
         commit('SET_LOADING',false)
      }
      catch(err){
          console.log(err.message)
          commit('SET_LOADING',false)
      }
},
 async registerUser({commit , dispatch}  , data){
     try {
        commit('SET_LOADING',true)
        var {
            user
          } = await firebaseAuth.createUserWithEmailAndPassword(data.email, data.password);
          // signout
            
         const profile = {
             id: user.uid ,              
             email: data.email,
             organisation: data.organisation,
             userrole: "user",
             verifedAccount: "pending"

             
         }
          // var {
          //       userProfile
          //     } = await firebaseDb.collection('userProfiles').add(profile)
                 
            //   console.log(userProfile)    
              // signout   
              firebaseAuth
              .signOut()
              .then(user => {
                Notify.create({
                    message: 'Account  sucessfully created , Now login to your account',
                    color: 'green'
                  })
                  
                // this.$router.push('/')
              })         
           dispatch('setRole' , profile)
           commit('SET_LOADING',false)
           commit('SET_MODAL',false)
            

     }
     catch(err) {
       console.log(err)
       Notify.create({
        message: err.message,
        color: 'red'
      })
       commit('SET_LOADING',false)       
     }
 },
 setRole({dispatch} ,profile){
    // console.log(profile)
     var addMessage = fbFunctions.httpsCallable("createProfile");

            var data = profile;

            addMessage(data)
 },
 approveAccount({commit ,dispatch} ,payload){
  console.log(payload)
  var updateAccount = fbFunctions.httpsCallable("approveAccount");

         var data = payload;

         updateAccount(data)
}
},
 getters:{
  status(state){
    return state.user.verifedAccount
 },
 }

}

export default auth 