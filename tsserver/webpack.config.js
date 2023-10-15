const path=require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: './index.ts',
  target: 'node',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    ],
  },
resolve: {
  extensions: ['.ts', '.js'],
},
output: {
  filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
},
mode: "development",
  externals: [nodeExternals()]
};