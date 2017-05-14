const webpack = require('webpack');
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// the output directory.
var output = path.resolve(__dirname, 'src/build');
// the directory where index.jsx is stored aka the bundler start point.
var input = path.resolve(__dirname, 'src/client/app');
var assets = path.resolve(__dirname, 'src/client/styles/assets')
var config = {
  
  entry: input + '/index.jsx', // starting file
  output: {
    // this casues issues in production eviroment
    publicPath: "/src/build/",
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
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            use: [ 'css-loader', 'less-loader'],
            fallback: "style-loader"
        })
      },
      {
        test:/\.(png|jpg|svg)$/,
        include:assets,
        loader:'url-loader',
        options:{limit:8125}
      },
      { 
        // test: /\.css$/, 
        // use: ExtractTextPlugin.extract({
        //   use: 'css-loader',
        //   fallback: 'style-loader'
        // })
      },

    ]
  },
  plugins: [new ExtractTextPlugin('style.css')],
};

module.exports = config;