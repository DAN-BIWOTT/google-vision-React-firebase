const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const vision = require("./vision.js");
var cors = require('cors');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// create a GET route
app.post('/MLphoto',cors(), (req, res) => {
    // console.log("called");
    // console.log(req.body.image_url);
    vision.getVision(req.body.image_url,function(error, label) {
        if ( error ) {
          console.log(error);
        }
        res.send(label);
      }
      );
    // res.send({label: label});
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});