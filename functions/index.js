const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer')
const cors = require("cors")({
    origin: true
  });
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// var transporter = nodemailer.createTransport(smtpTransport({
//     service: 'gmail',
//     auth: {
//         user: 'uduguleader@gmail.com',
//         pass: 'Udugu@2020'
// }
//   }));



// exports.sendEmails = functions.https.onCall((data, context) => {
//     // ...
//     // cors(data, context, () => {})
//     const mailOptions = {
//         from: 'uuguleader@gmail.com',  // You can write any mail Adress you want this doesn't effect anything
//         to: 'effysetumeni87@gmail.com', // This mail adress should be filled with any mail you want to read it
//        // tile: "val.title",
//         subject: 'Sample Subject', // Sample Subject for you template
//         html: `<h1>Order Confirmation</h1>
//          <p> <b>Email: </b>'test email' </p>`

//     }

//     return  transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: ' );
    
// })
//   })


var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'uduguleader@gmail.com',
        pass: 'Udugu@2020'
    }
});
var listTostring=function(arr){
    var str = ''
    if(arr.length>0){
    for(var i= 0; i <arr.length ; i++){
        str+=(i+1)+":"+"  "+arr[i]+"\n"
    }
    return str
   }else{
       return str
   }
};
exports.racerEmail = functions.https.onCall((data, context) => {
    
    // ...
    console.log('msg')
    const mailOptions = {
                from: 'uduguleader@gmail.com',  // You can write any mail Adress you want this doesn't effect anything
                to: `${data.email}`, // This mail adress should be filled with any mail you want to read it
               // tile: "val.title",
                subject: `${data.subject}`, // Sample Subject for you template
                attachments: [
                    {   // encoded string as an attachment
                        filename: 'report.pdf',
                        content: data.redData,
                        encoding: 'base64'
                    },
                ],
                html: `<h1></h1>
                 <p>${data.message}</p>`
        
            }
            return  transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: ' );
                    
                })
  });
//   createSession
exports.createSession = functions.https.onCall((data, context) => {
     
    // ...
   // console.log('msg')
    
    const mailOptions = {
                from: 'uduguleader@gmail.com',  // You can write any mail Adress you want this doesn't effect anything
                to: data.emails, // This mail adress should be filled with any mail you want to read it
               // tile: "val.title",
                subject: `${data.type} SESSION DETAILS`, // Sample Subject for you template
                html: `<h3>INSTRUCTIONS</h3> 
                To complete the ${data.type} session click the link below .
                 When completing  the questionaire use the session id given below <br/>
             <b>Session ID: </b>${data.id}<br/>
             <b>Link: </b>${data.link}  <br/>

                 <h3>Session Details </h3><br/>
                  <b>Date: </b>${data.date} <br/>
                  <b>Title: </b>${data.title} <br/>
                  <b>Location: </b>${data.location} <br/>
                  <b>Objectives: </b>${listTostring(data.objectives)} <br/>
                  <b>Topics: </b>${listTostring(data.topics)} <br/>
                  <b>Seminar Approach: </b>${listTostring(data.seminarApproach)} <br/>
                  
                 
                  <h3>info </h3><br/>
                  ${data.message}
                 `
        
            }
            return  transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: ' );
                    
                })
  });
 
  exports.updateEmails = functions.https.onCall((data, context) => {
     
    // ...
   // console.log('msg')
    
    const mailOptions = {
                from: 'uduguleader@gmail.com',  // You can write any mail Adress you want this doesn't effect anything
                to: data.emails, // This mail adress should be filled with any mail you want to read it
               // tile: "val.title",
                subject: `UPDATED DETAILS for ${data.type} SESSION , ${data.id} `, // Sample Subject for you template
                html: `
                
                <h3>INSTRUCTIONS</h3> 
                To complete the ${data.type} session click the link below .
                 When completing  the questionaire use the session id given below <br/>
             <b>Session ID: </b>${data.id}<br/>
             <b>Link: </b>${data.link}  <br/>

                 <h3>Details and Information</h3><br/>
                  <b>Date: </b>${data.date} <br/>
                  <b>Title: </b>${data.title} <br/>
                  <b>Location: </b>${data.location} <br/>
                  <b>Objectives: </b>${listTostring(data.objectives)} <br/>
                  <b>Topics: </b>${listTostring(data.topics)} <br/>
                  <b>Seminar Approach: </b>${listTostring(data.seminarApproach)} <br/>
                  
                 
                 
                 
                 `
        
            }
            return  transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: ' );
                    
                })
  });
