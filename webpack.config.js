const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

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
          options: {
            configFileName: 'tsconfig.umd.json'
          }
        }
      }
    ]
  },
  plugins: [
    new TerserPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  }
}
