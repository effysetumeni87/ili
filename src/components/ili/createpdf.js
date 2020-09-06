const  jsPDF  = require('jspdf')

const createPdf = function(data,method){
    var lMargin=15; //left margin in mm
    
     
    const doc = new jsPDF( "p","mm","a4")
    console.log(doc)
  //  doc.text(lMargin,46, 'Session Date:'+' test test est'+ data)
    method
}

export default createPdf