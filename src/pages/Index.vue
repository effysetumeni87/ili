<template>
  <q-page class="flex row flex-center ">
    
    
    <div class="col-12 full-height window-height  bg-blue-grey-1">
             <q-img src='bg6.jpg' class="window-height ">
              <div class="absolute-full transparent text-h4 text-weight-bolder row  flex flex-center">
                 
                 <div class="col-6">
                   <loginForm />
                 </div>
            
             </div>            
             </q-img>
        </div>
      
      
  </q-page>
</template>

<script>
import loginForm from '../components/loginForm'
 export default {
 components:{
      loginForm
 },
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