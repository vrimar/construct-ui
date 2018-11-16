const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'construct-ui.min': './src/index.ts'
  },
  externals: {
    mithril: 'm'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'CUI',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader',
        }
      }
    ]
  },
  plugins: [
    // new UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  }
}
