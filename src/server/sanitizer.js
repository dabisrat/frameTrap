var cheerio = require ('cheerio');
var fs = require('fs');
var path = require('path');
var bluebird = require('bluebird');
var db = require('./dataBase/db.js');

var fsReadFile = bluebird.promisify(fs.readFile);
var fsReadDir = bluebird.promisify(fs.readdir);
var dbQuery = bluebird.promisify(db.query, {context: db})
var log = console.log;

fsReadDir(__dirname + '/frameData')  //==> [x.htm, y.html, z.html] 
  .then( (characterFiles) => {
     return Promise.all( characterFiles.map( (file) =>  {
       return extractData(file);
     }))
  })  
  .then( (characterData) => { //  [ {stats: [ [], [],[] ], attack: [ [], [],[] ]}, ... ]
    return characterData.map( (characterObj) => {
      var obj = {}
      obj.character = buildCharacterObject(characterObj.stats)
      obj.attack = buildAttackObject(characterObj.attack)
      return obj
    })    
  })
  .then( (data) => {
    data.forEach( (obj) => {
      var charName = obj.character[0];
      addToCharacterTable(obj.character)
      addToAttackTable(obj.attack, charName)
     })    
  })
  .catch( (err) => {
   throw new Error(err);
 })

function extractData(character) {
  return new Promise( (resolve, reject) => {
    var charName = character.slice(0, character.length - 5);
    fsReadFile(__dirname + '/frameData/' + character, 'utf8')
    .then( (data) => { 
      resolve({
        stats: processCharacterData(data, charName), 
        attack: processAttackData(data, charName)
      }) 
    })
  });
};

function processCharacterData(data, charName) {
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
return charData;  
}

function buildCharacterObject(array) {
  var data = [];
  data.push(array[array.length - 1])
  array.forEach( (ele, index) => {
    if ( ele.includes('Health:') ) {
      data.push( Number(ele[1]) )
      data.push( Number(ele[3]) )
    }
    if ( Array.isArray(ele) && ele.some( (element) => element.includes('Frames') ) ) {
      if (ele[1] === '') {
        data.push(null);
      } else {
        data.push( Number(ele[1]) );
      }
    }
  })
  return data
}

function addToCharacterTable(characterData) {
  var queryStr= 'INSERT INTO characters \
  (Character_Name, Health, Stun, F_Dash, B_Dash) \
  VALUES (?,?,?,?,?)'
  dbQuery(queryStr, characterData)
    .then(log)
    .catch( (err) => {
      throw new Error(err);
    })
}

function processAttackData(data, charName) {
  var charData =[];  
  var $ = cheerio.load(data);
  $('.wikitable').eq(1)
    .find('tr').each( (rowI, r) => { 
    var columnData = [];
    $(r).find('td').each( (colI, c) => { 
      var text = $(c).text()
      columnData.push( text.slice(0, text.length -1) ) 
    })
  charData.push(columnData);    
  })
charData.push(charName)
return charData;
}

function buildAttackObject(attacks) {
  var data = [];
  attacks.forEach( (attack) => {
    if ( !Array.isArray(attack) || attack.length === 0) {return}
    data.push( attack.slice(0,10).map( (attackProp, i) => {
      if (attackProp === '' || attackProp === '-' || attackProp.includes('KD')) {
        return null 
      }      
      if (i < 2 || i === 3 || i > 7) {
        return attackProp;
      } else {
        return parseInt(attackProp,10);
      }
    }))
  })
  return data;
}

function addToAttackTable(attackData, characterName) {
 var queryStr= 'INSERT INTO attacks \
  (Character_Name, Attack_Name, Input, Start_Up, Active, Recovery, OBA, OHA, OCA, Damage, Stun ) \
  VALUES ( (select Character_Name from characters where Character_Name = ?),?,?,?,?,?,?,?,?,?,?)'
  attackData.forEach( (attack) => {
    attack.unshift(characterName);
    dbQuery(queryStr, attack)
    .then(log)
    .catch( (err) => {
      throw new Error(err);
    })
  })
}


