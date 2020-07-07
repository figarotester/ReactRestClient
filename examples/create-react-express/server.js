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
    axios.get(req.body.proxyurl)
       .then(function (response) {

        // get response headers
        for(const h in response.headers) {
          const key = h;
          const value = response.headers[h];
          console.log(`Proxy response header -> ${key}: ${value}`);
          res.setHeader(key, value);
        }
      // get response body
       res.send(response.data);
   })
   .catch(function (error) {
     console.log(error);
   });
 
   }
 })

 // debug endpoint use to echo request as sent to this endpoint back as the response
 // typically you can call this endpoint from postman as a test
 // 
 app.post('/echo', function (req, res) {
  let responseBody = req.body;
  responseBody["request-params"] = req.query;
  res.body = responseBody;
  for(const h in req.headers) {
    const key = h;
    const value = req.headers[h];
    console.log(`request header -> ${key}: ${value}`);
    res.setHeader(h, req.headers[h]);
  }
  res.send(responseBody);
})

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
