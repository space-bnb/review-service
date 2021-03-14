const path = require('path');
const PUB = path.resolve(process.env.PWD, 'dist');
const SRC = path.resolve(process.env.PWD, 'src');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', SRC + '/index.jsx'],
    mode: 'production',
    output: {
        path: PUB,
        filename: 'reviews.js',
        publicPath: '/'
    },
    plugins: [
        new CompressionPlugin(),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: 'babel-loader',
                include: SRC,
            },
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
};
