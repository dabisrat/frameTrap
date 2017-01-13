var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var scraper = require('./scraper');
var morgan = require('morgan');
var sanitizer = require('./sanitizer')
//scraper();

const app = express();


app.use(express.static(path.resolve('src/client')));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.listen(3000, () =>{
  console.log('connected to server listening on port 3000')
})