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

  const requestBody = {

    "EncryptedSessionId": "*",
    "ClientIp": "127.0.0.1",
    "TargetURL": "null",
    "SessionId": "Awzvis2CGtFstNokTfjj-Cj68orgcsG_sF9bpQ8uZVI@IKY1TmflK9Ekv_KrBe5ZaA@IDxIlPR78lJnX4O8MfS_B0Y1T6o67pti_PAZA59U0C8hQykIbFZWQteY7mRMKvMnPsnMA5ZZmxfCLxstbMgrPqtkAO-olmkdT1IUUpni7HRvYn2WJsHMrXHxhBXCt16ejnULqEsZKkIkT5sS1--17lujALOxcuxlbSgPDJR_eringBb-KB5XvPX28139mPGK1IZ7CSf4XpaehsxyBOsWToX3Zj3EVjYT9Q0pPVbVtE1ySy6u-tCdz6U2QMgEPIJpGbYYSmQA35ZID1UnfxSv6uI9b-hcnUSylR3cwv4dbfkZTZrCxrSshhbUZ1_nbc-5wfpNzo1YejlxbSeevnjYDHtEDd1OqJdhbm_xY6KJsOE",
    "PKey": "*",
    "KeepMeIn": false
  }

  if(req.body.proxymethod.toLowerCase() === 'post'){
    console.log(`request for ${req.body.proxyurl} with method ${req.body.proxymethod}`);
    axios.post(req.body.proxyurl, requestBody, {withCredentials: true})
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

  if(req.body.proxymethod.toLowerCase() === 'put'){
    console.log(`request for ${req.body.proxyurl} with method ${req.body.proxymethod}`);
    axios.put(req.body.proxyurl, requestBody, {withCredentials: true})
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

  if(req.body.proxymethod.toLowerCase() === 'delete'){
    console.log(`request for ${req.body.proxyurl} with method ${req.body.proxymethod}`);
    axios.delete(req.body.proxyurl, {data: requestBody}, {withCredentials: true})
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

 })

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