// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp API endpoint...
app.get("/api/timestamp/:date_string?", function (req, res) {
  const { params: { date_string } } = req;
  
  // 1450137600000
  const isUnixTimeStamp = !/[^0-9]/g.test(date_string)
  
  // new Date() likes to take its unixTimeStamp argument as number
  const instanceSource = isUnixTimeStamp ? parseInt(date_string) : date_string
  
  // Undef check
  const dateInstance = date_string === undefined ? new Date() : new Date(instanceSource)
  
  // Date Compatible Flag
  const isDateCompatible = isUnixTimeStamp || !Number.isNaN(Date.parse(date_string));  
  
  // Erroneous case handle
  if (date_string !== undefined && !isDateCompatible) { res.json({ error: "Invalid Date" }); }
  
  // Rest case handle
  res.json({ unix: dateInstance.getTime(), utc: dateInstance.toUTCString() })
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
