const path = require('path');

/** @type {import('webpack').Configuration} */
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
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.umd.json'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  }
}
