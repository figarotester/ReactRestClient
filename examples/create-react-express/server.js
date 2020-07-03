const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const axios = require('axios');
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/proxy', function (req, res) {
 
   if (req.body.proxymethod.toLowerCase() === 'get' ) {
    console.log(`request for ${req.body.proxyurl} with method ${req.body.proxymethod}`);
    axios.get(req.body.proxyurl)
       .then(function (response) {
        console.log(`-------------\n${JSON.stringify(response.data)}\n-----------------`);
       res.send(response.data);
   })
   .catch(function (error) {
     console.log(error);
   });
 
   }
 })

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
