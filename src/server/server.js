var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

const app = express();
console.log(path.resolve())
app.use(express.static(path.resolve('src/client')));
app.use(bodyParser.json())

app.get('/', (req, res) =>  {
  res.status(200).sendFile('index')
})

app.listen(3000, () =>{
  console.log('connected to server listening on port 3000')
})