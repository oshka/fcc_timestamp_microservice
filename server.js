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
app.get("/api/timestamp", function (req, res) {
  var date_string = new Date();  
  res.json({"unix": date_string.getTime(), "utc" : date_string.toUTCString() });
});

app.get("/api/timestamp/:date_string", function (req, res) {
  var date_string_req = req.params.date_string;
  //res.send(req.params.date_string);
  if(!date_string_req.includes('-')) {
    date_string_req = parseInt(date_string_req);
  }
   var date_string = new Date(date_string_req);
  if(date_string=='Invalid Date') {
    res.json({"error" : "Invalid Date" });
  } else {
      res.json({"unix": date_string.getTime(), "utc" : date_string.toUTCString() });
  }
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});