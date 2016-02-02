'use strict';

var path = require('path');
var webpack = require('webpack');
var NpmInstallPlugin = require('npm-install-webpack-plugin');

var config = {
  devtool: 'eval',
  entry: [
   'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './src/js/index.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: path.join(__dirname, 'src/js')
      }
    ],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new NpmInstallPlugin()
  ]
};

module.exports = config;
