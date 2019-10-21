const path = require('path');

const src = path.join(__dirname, '/client/src');
const dist = path.join(__dirname, '/client/src/dist');

module.exports = {
  mode: 'development',
  entry: {
    vendor: ['styled-components'],
    app: `${src}/index.jsx`,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
  ],
  output: {
    filename: 'bundle.js',
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
};
