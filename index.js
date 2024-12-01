// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api", function(req, res, next) {
  res.json( { unix: new Date().getTime(), utc: new Date().toUTCString() })
});

app.get("/api/:date?", function(req, res, next) {
  next();
}, function(req, res) {
  
  if (isNaN(Number(req.params.date)) && new Date(req.params.date) == "Invalid Date") {
      return res.json( { error: "Invalid Date" } );
  } else if (new Date(Number(req.params.date)) != null && isNaN(Number(req.params.date))) {
      return res.json( { unix: new Date(req.params.date).getTime(), utc: new Date(req.params.date).toUTCString() } );
  } else {
      return res.json( { unix: new Date(Number(req.params.date)).getTime(), utc: new Date(Number(req.params.date)).toUTCString() } );
  }

});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
