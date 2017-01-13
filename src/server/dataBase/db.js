var mysql  = require('mysql');
var connection = mysql.createConnection({
  user     : 'root',
  password : 'db',
  database: 'frametrap'
});
 
connection.connect(function (err) {
  if (err) {
    throw new Error(err);
  }
  console.log('connected to frametrap')
});

module.exports = connection;