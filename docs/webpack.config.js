const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const packageJson = require('../package.json');

const APP_TITLE = `Construct-ui: ${packageJson.description} - v${packageJson.version}`;
const TEMPLATE_PATH = 'src/index.template.ejs';
const isProduction = process.env.NODE_ENV === 'production';
const PORT = 9000;

const plugins = {
  production: [
    new ExtractTextPlugin('app-[hash:6].css'),
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      title: APP_TITLE,
      template: TEMPLATE_PATH,
      favicon: 'src/favicon.ico'
    })
  ],
  development: [
    new HtmlWebpackPlugin({
      template: TEMPLATE_PATH,
      title: APP_TITLE,
      favicon: 'src/favicon.ico'
    }),
    new CheckerPlugin()
  ]
}

const cssLoader = {
  production: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      { loader: 'css-loader', options: { minimize: true, importLoaders: 1 } },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: () => [require('autoprefixer')]
        }
      },
      'resolve-url-loader',
      'sass-loader?sourceMap'
    ]
  }),
  development: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
}

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: isProduction ? 'app-[hash:6].js' : 'app.js',
    path: path.resolve(__dirname, 'public'),
    pathinfo: isProduction ? true : false
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: isProduction ? cssLoader.production : cssLoader.development
      },
      {
        test: /\.(jpe?g|png|gif|ico|svg)$/i,
        use: "file-loader",
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useCache: isProduction ? false : true,
          }
        }
      }
    ]
  },
  plugins: isProduction ? plugins.production : plugins.development,
  devtool: isProduction ? undefined : 'cheap-eval-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@shared': path.resolve(__dirname, '../src/_shared'),
      '@': path.resolve(__dirname, '../src')
    }
  },
  optimization: isProduction ? {} : {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  },
  devServer: {
    port: PORT,
    stats: 'errors-only',
    open: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }
}
