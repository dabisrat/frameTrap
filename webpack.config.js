var webpack = require('webpack');
var path = require('path')

// the output directory.
var output = path.resolve(__dirname, 'src/client/build');
// the directory where index.jsx is stored aka the bundler start point.
var input = path.resolve(__dirname, 'src/client/app');

var config = {
  // starting file
  entry: input + '/index.jsx',
  output: {
    // output directory
    path: output,
    // file that gets created in the output dir after bundling.
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test:/\.jsx?/,
        include:input,
        loader:'babel'
      }
    ]
  }
};

module.exports = config;