'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('data.json');
let all = JSON.parse(rawdata);
let items = all["item"];
for (const element of items) {
    console.log(element["name"]);
  }