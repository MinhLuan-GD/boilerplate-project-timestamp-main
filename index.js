// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  const time = req.params.date;
  let date;
  if (!time) date = new Date();
  else if (time.match(/\D/)) date = new Date(time);
  else date = new Date(parseInt(time));
  if (!dateIsValid(date)) res.json({ error: "Invalid Date" });

  const dow = cvDOW(date.getUTCDay());
  const day = addZ(date.getUTCDate());
  const month = cvMon(date.getUTCMonth());
  const year = date.getUTCFullYear();
  const hour = addZ(date.getUTCHours());
  const min = addZ(date.getUTCMinutes());
  const sec = addZ(date.getUTCSeconds());

  const unix = date.getTime();
  const utc = `${dow}, ${day} ${month} ${year} ${hour}:${min}:${sec} GMT`;

  res.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

const dateIsValid = (date) => date instanceof Date && !isNaN(date);

const cvDOW = (dow) => {
  const Day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return Day[dow];
};

const cvMon = (mon) => {
  const Month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return Month[mon];
};

const addZ = (input) => {
  if (input < 10) input = "0" + input;
  return input;
};
