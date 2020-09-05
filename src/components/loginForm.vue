<template>
  <div>
      <q-card>
          <q-card-section>
              <div class="col-12 text-center text-blue-grey-10" >
                 ILI ADMIN  
                 </div>
          </q-card-section>
      </q-card>
       <q-card class="    ">
               <q-toolbar class="bg-blue-grey-10 text-white" >
                 <q-toolbar-title class="text-center">
                  LOGIN
                 </q-toolbar-title>
               </q-toolbar>
          <q-form   ref="loginform" class="q-gutter-md" @submit="userlogin">
          <q-card-section class="text-indigo-10">
            <q-separator inset />
            
          
 
      <q-input
        filled
        v-model="login.email"
        label="Your Email*"
        hint="Enter email or username"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Enter you email']"
      />

      <q-input
        filled
        type="password"
        v-model="login.password"
        label="Password"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Enter your password',
          
        ]"
      />

      <!-- <q-toggle  label="I accept the license and terms" /> -->

    
          </q-card-section>
          <q-card-actions class="bg-white">
        <q-btn label="Login" type="submit" :loading="loading" color="green-10" icon-right="send"/>
        <q-space/>
          <span class="text-subtitle2" >  </span>
       
      </q-card-actions>
       </q-form>
        </q-card>
        
  </div>
</template>


<script>
 export default {
 
 data(){
     return {
       login: { 
          email: "",
          password: ""
       }
     }
 },
 computed: {
  loading(){
     return this.$store.state.auth.loading
    
  }
 },
 methods: {
   userlogin: function(){
     this.$refs.loginform.validate()
     .then( success=>{
       if(success){
          const loginData= this.login
          this.$store.dispatch('auth/userLogin', loginData )
       }
     })
     
   }
 }
}
</script>
 
<style>

</style>

<style>

</style>