'use strict';

var path = require('path');
var webpack = require('webpack');

var config = {
  devtool: 'eval',
  entry: [
    './src/js/index.js'
  ],
  output: {
    filename: './desktop/js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url?limit=25000'
      },
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot','babel?stage=0&optional=runtime&plugins=typecheck'],
        include: path.join(__dirname, 'src/js')
      },
      { test: /\.scss$/,
       loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
      }
    ],
    noParse: []
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {}
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
