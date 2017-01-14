var request = require('request');
var cheerio = require ('cheerio');
var fs = require('fs');
var path = require('path');

// _____________________ using bluebird Promises with promisify ________________________________________________
var bluebird = require('bluebird')
var promisifyWriteFile = bluebird.promisify(fs.writeFile);
var promisifyRequest = bluebird.promisify(request);

module.exports = function () {
  var characters = [
    'Alex', 'Birdie', 'Cammy', 'ChunLi', 'Dhalsim', 'Fang', 'Guile',
    'Karin', 'Ken', 'Laura', 'MBison', 'Nash', 'Necalli', 'RMika',
    'Rashid','Ryu','Vega','Zangief'
  ];
  characters.forEach(function (character) {
    var charURL = 'http://wiki.shoryuken.com/Street_Fighter_V/' + character;
    var dirPath = path.resolve('src/server/frameData/' + character + '.html');
    promisifyRequest(charURL)
      .then(function (content) {
        promisifyWriteFile(dirPath, getFrameData(content.body));
      })
      .catch(function (err){
        if (err) { throw new Error (err) }
      });
      //console.log( character + ' frameData saved');
  });

  function getFrameData (html) {
    var $ = cheerio.load(html);
    return $('.wikitable')
  }
}
// ___________________________________________________________________________________________________________

// ________________________________ using native promises ____________________________________________________
// module.exports = function () {
//   var characters = [
//     'Alex', 'Birdie', 'Cammy', 'ChunLi', 'Dhalsim', 'Fang', 'Guile',
//     'Karin', 'Ken', 'Laura', 'MBison', 'Nash', 'Necalli', 'RMika',
//     'Rashid','Ryu','Vega','Zangief'
//   ];
//   characters.forEach(function (character) {
//     var charURL = 'http://wiki.shoryuken.com/Street_Fighter_V/' + character;
//     var dirPath = path.resolve('src/server/frameData/' + character + 'FrameData.html');
//     requestData(charURL, dirPath)
//       .then(writeData)
//       .catch(handleErr)
//     console.log( character + ' frameSata saved');
//   });

//   function requestData(url, writePath) {
//     return new Promise(function (resolve, reject) {
//       request(url, function (err, response, html){
//         if (err) {
//          return reject(err);
//         }
//         resolve({
//           html: html, 
//           writePath: writePath
//         });
//       });
//     });
//   };

//   function writeData(content) {
//     return new Promise(function (resolve, reject) {
//       fs.writeFile(content.writePath, content.html, function(err) {
//         if (err) {
//           return reject(err);
//         }
//         resolve(content);
//       });
//     });
//   };

//   function handleErr(err){
//     if (err) {
//       throw new Error(err)
//     }
//   };
// }
//___________________________________________________________________________________________________________

// _____________________________ using raw callbacks _________________________________________________________

// module.exports = function() {
//   var char = [
//     'Alex', 'Birdie', 'Cammy', 'ChunLi', 'Dhalsim', 'Fang', 'Guile',
//     'Karin', 'Ken', 'Laura', 'MBison', 'Nash', 'Necalli', 'RMika',
//     'Rashid','Ryu','Vega','Zangief'
//   ];
//   var length = char.length, i = 0;
//   for (i; i < length; i++) {
//     var uri = 'http://wiki.shoryuken.com/Street_Fighter_V/' + char[i];
//     var dir = path.resolve('src/server/frameData/' + char[i] + 'FrameData.html');
//     httpRequest(uri, i, dir, char)
//   }

//   function httpRequest(uri, i, dir, char) {
//     request(uri, function (err, response, html) {
//       if (!err) {
//         fs.writeFile(dir, html, function (err) {
//           if (!err) {
//             console.log(char[i],'data saved');
//           } else {
//             throw new Error (err);
//           }
//         });
//       }
//     });
//   }
// };
//___________________________________________________________________________________________________________

