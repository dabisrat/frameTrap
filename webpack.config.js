var webpack = require('webpack');
var path = require('path')

// the output directory.
var output = path.resolve(__dirname, 'src/build');
// the directory where index.jsx is stored aka the bundler start point.
var input = path.resolve(__dirname, 'src/client/app');
var assets = path.resolve(__dirname, 'src/client/styles/assets')
var config = {
  
  entry: input + '/index.jsx', // starting file
  output: {
    publicPath: "src/build/",
    path: output,  // output directory
    filename: 'bundle.js', // file that gets created in the output dir after bundling.
  },
  module: {
    rules: [
      {
        test:/\.jsx?/, // target es6 and jsx to convert to es5
        include:input,
        loader:'babel-loader'
      },
      // if the assests where on a server wold this work as an alternitve to an file loader?
      // { 
      //   test: /\.css$/, 
      //   use:[ 'style-loader', {loader:'css-loader', options: { url: false }}] 
      // },
      { 
        test: /\.css$/, 
        use:[ 'style-loader', 'css-loader',] 
      },
      {
        test:/\.(png|jpg|svg)$/,
        include:assets,
        loader:'url-loader',
        options:{limit:8125}
      }

    ]
  },
  devtool: "cheap-eval-source-map"
};

module.exports = config;