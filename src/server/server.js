var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// var scraper = require('./scraper');
var morgan = require('morgan');
// var sanitizer = require('./sanitizer')


const app = express();


app.use(express.static(path.resolve()));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.sendFile('index.html')
})

app.listen(3000, () =>{
  console.log('connected to server listening on port 3000')
})