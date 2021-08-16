const vision = require("@google-cloud/vision");

module.exports = {
    getVision: function(){
        const labels = "";
        const machine_site =  new vision.ImageAnnotatorClient({
            keyFilename: 'APIKEY.json'
        });
   
        machine_site.labelDetection("./cover.jpg")
        .then((results)=>{
            labels  = results[0].labelAnnotations;
    
            console.log("labels: ");
            labels.forEach((label)=>console.log(label.description));
        })
        .catch((err)=>{console.log("ERROR: ",err)})
        return labels;
    }
}