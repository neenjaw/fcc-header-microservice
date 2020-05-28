// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your request header endpoint...
app.get("/api/whoami", (req, res) => {
  const firstLevel = [];
  for (let prop in req) {
    firstLevel.push(prop);
  }
  firstLevel.sort();
  console.log(firstLevel);
  console.log(req.get('user-agent'));

  res.json({
    ipaddress: req.connection.remoteAddress,
    language: req.acceptsLanguages().join(","),
    software: req.get('user-agent')
  });
});

// listen for requests :)
var listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
