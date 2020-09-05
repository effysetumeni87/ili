// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
//export default async (/* { app, router, Vue ... } */) => {
  // something to do
 
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import fb from 'firebase'
 
const firebaseConfig = {
  apiKey: "AIzaSyC6gOENHmQK6smN8aitfLkyj5flLqjNCyc",
  authDomain: "egitrust.firebaseapp.com",
  databaseURL: "https://egitrust.firebaseio.com",
  projectId: "egitrust",
  storageBucket: "egitrust.appspot.com",
  messagingSenderId: "335252524756",
  appId: "1:335252524756:web:33c19993958e38b3e7b541",
  measurementId: "G-FWPF0PMT9W"
};

  let firebaseApp = firebase.initializeApp(firebaseConfig)
  let firebaseAuth= firebaseApp.auth()
  let firebaseDb = firebaseApp.firestore()
   let  fbFunctions = fb.functions()
  

  export {firebaseAuth , firebaseDb , fbFunctions }