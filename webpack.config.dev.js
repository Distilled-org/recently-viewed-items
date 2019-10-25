const path = require('path');

const src = path.join(__dirname, '/client/src');
const dist = path.join(__dirname, '/client/src/dist');

module.exports = {
  mode: 'development',
  entry: {
    vendor: ['styled-components'],
    app: `${src}/index.jsx`,
  },
  output: {
    filename: '[name].bundle.js',
    path: dist,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devServer: {
    open: true,
  },
  optimization: {
    splitChunks: {
      minChunks: Infinity,
      name: 'vendor',
    },
    runtimeChunk: {
      name: 'vendor',
    },
  },
};
