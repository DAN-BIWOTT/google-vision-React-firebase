const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const vision = require("./vision.js");
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
app.get('/MLphoto', (req, res) => {
    res.send({express: vision.getVision()});
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});