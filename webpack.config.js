const path = require('path');
const PUB = path.resolve(process.env.PWD, 'client', 'dist');
const SRC = path.resolve(process.env.PWD, 'client', 'src');

module.exports = {
  entry: ['@babel/polyfill', SRC + '/index.jsx'],
  output: {
    path: PUB,
    filename: 'reviews.js'
  },
  module: {
    rules: [ 
      { 
        test: /\.js/,
        exclude: /node_modules/,
        use: 'babel-loader', 
        include: SRC        
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'     
        ],
      }
    ]
  }
};