// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res) => {
  let date = req.params.date;
  // date = new Date(date);
  let unix, utc;
  console.log(date.split("-").length);
  if (date.split("-").length < 1) {
    unix = date.toString();
    date = new Date(date);
    utc = date.toString("MM dd");

  } else {
    //first

    date = new Date(date);
    utc = date.toUTCString();
    unix = date.getMilliseconds();
  }

  console.log('date', date, typeof date);
  return res.json({ unix: unix, utc: JSON.stringify(utc) });
})
const port = process.env.PORT || 5000;
// listen for requests :)
app.listen(port, function() {
  console.log('Your app is listening on port ' + port);
});
