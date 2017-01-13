var cheerio = require ('cheerio');
var fs = require('fs');
var path = require('path');
var bluebird = require('bluebird');
//var db = require('./dataBase/db.js');

var fsReadFile = bluebird.promisify(fs.readFile);
var fsReadDir = bluebird.promisify(fs.readdir);
var log = console.log;

fsReadDir(__dirname + '/frameData')  //==> [x.htm, y.html, z.html] 
  .then( (characterFiles) => {
    return Promise.all( characterFiles.map( (file) =>  {
     return extractData(file)
    }))
  })  
  .then( (characterData) => {
    var stats = characterData.map( (character) => {
      return buildCharacterObject(character);
    })
    return stats;
    //  return Promise.all( characterData.map( (character) => {
    //    return buildCharacterObject(character); 
    //  }))
  }).then(log);
  //.then( () => {
    // for each char add to db
 // })
  //.catch( function( err) {
   // throw new Error(err);
 // })

function extractData(character) {
  return new Promise( (resolve, reject) => {                                   //character
    var charName = character.slice(0, character.length - 5);
    fsReadFile(__dirname + '/frameData/' + character, 'utf8')
    .then( (data) => {
      var charData =[];  
        var $ = cheerio.load(data);
        $('.wikitable').eq(0)
          .find('tr').each( (rowI, r) => { 
            var columnData = [];
            $(r).find('th,td').each( (colI, c) => { 
              var text = $(c).text()
              columnData.push( text.slice(0, text.length -1) ) 
            })
          charData.push(columnData);    
        })
      charData.push(charName)
      resolve(charData) 
    })
  });
};

  function buildCharacterObject(array){
    var data = [];
    data.push(array[array.length - 1])
    array.forEach( (ele, index) => {
      if ( ele.includes('Health:') ) {
        data.push(ele[1])
        data.push(ele[3])
      }
      if ( Array.isArray(ele) && ele.some( (element) => element.includes('Frames') ) ) {
        data.push(ele[1])
      }
    })
    return data
  }

