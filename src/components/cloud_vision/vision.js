const vision = require("@google-cloud/vision");
require('express');
module.exports = {
    getVision: function(image_url,callback){
        let labels = "";
        const machine_site =  new vision.ImageAnnotatorClient({
            keyFilename: './APIKEY.json'
        });
        
         machine_site.labelDetection(image_url)
        .then((results)=>{console.log(results);
            labels  = results[0].labelAnnotations;
            
            console.log("labels: ");
            labels.forEach((label)=>console.log(label.description));
            console.log(labels[0].description);
            callback(null,labels[0].description);
        })
        .catch((err)=>{console.log("ERROR: ",err)});
    }
}