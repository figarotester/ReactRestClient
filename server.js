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

  switch(req.body.proxymethod.toLowerCase()) {
    case "get": 
    {
      console.log(`request for ${req.body.proxyurl} with method ${req.body.proxymethod}`);
      axios.get(req.body.proxyurl, {withCredentials: true})
         .then(function (response) {
          console.log(`-------------\n${JSON.stringify(response.data)}\n-----------------`);
  
         for(const h in response.headers){
           const key = h;
           const value = response.headers[h];
           console.log(`Proxy response header -> ${key}: ${value}`);
           res.setHeader(key, value);
         }
  
         res.send(response.data);
  
     })
     .catch(function (error) {
       console.log(error);
     });
  
    }
    break;
    case "post": 
    {
      console.log(`Server: request url and method - ${req.body.proxyurl} with method ${req.body.proxymethod}`);
      console.log(`Server: requestBody - ${JSON.parse(JSON.stringify(req.body.proxyrequestbody, null, 2))}`);
      console.log(`Server: requestHeaders - ${JSON.stringify(req.body.proxyrequestheaders, null, 2)}`);
      axios.post(req.body.proxyurl, req.body.proxyrequestbody, req.body.proxyrequestheaders)
        .then(function (response) {
        console.log(`-------------\n${JSON.stringify(response.data)}\n-----------------`);
  
        for(const h in response.headers){
          const key = h;
          const value = response.headers[h];
          console.log(`Proxy response header -> ${key}: ${value}`);
          res.setHeader(key, value);
        }
  
        res.send(response.data);
  
        }).catch(function (error) {
          console.log(error);
        });
      }
    break;
    case "put": 
    {
      console.log(`request for ${req.body.proxyurl} with method ${req.body.proxymethod}`);
      axios.put(req.body.proxyurl, req.body.proxyrequestbody)
        .then(function (response) {
        console.log(`-------------\n${JSON.stringify(response.data)}\n-----------------`);
  
        for(const h in response.headers){
          const key = h;
          const value = response.headers[h];
          console.log(`Proxy response header -> ${key}: ${value}`);
          res.setHeader(key, value);
        }
  
        res.send(response.data);
  
        }).catch(function (error) {
          console.log(error);
        });
    }
    break;
    case "delete": 
    {
      console.log(`request for ${req.body.proxyurl} with method ${req.body.proxymethod}`);
      console.log(`Server: request url and method - ${req.body.proxyurl} with method ${req.body.proxymethod}`);
      console.log(`Server: requestBody - ${JSON.parse(JSON.stringify(req.body.proxyrequestbody, null, 2))}`);
      console.log(`Server: requestHeaders - ${JSON.stringify(req.body.proxyrequestheaders, null, 2)}`);
      axios.delete(req.body.proxyurl, {data:req.body.proxyrequestbody}, req.body.proxyrequestheaders)
        .then(function (response) {
        console.log(`-------------\n${JSON.stringify(response.data)}\n-----------------`);
  
        for(const h in response.headers){
          const key = h;
          const value = response.headers[h];
          console.log(`Proxy response header -> ${key}: ${value}`);
          res.setHeader(key, value);
        }
  
        res.send(response.data);
  
        }).catch(function (error) {
          console.log(error);
        });
    }
    default: 
    {

    }
    break;
  }
});
  
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
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});