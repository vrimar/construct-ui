const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const packageJson = require('../package.json');

const APP_TITLE = `Construct-ui: ${packageJson.description} - v${packageJson.version}`;
const TEMPLATE_PATH = 'src/index.template.ejs';
const isProduction = process.env.NODE_ENV === 'production';
const PORT = 9000;

const plugins = {
  common: [
    new HtmlWebpackPlugin({
      title: APP_TITLE,
      template: TEMPLATE_PATH
    })
  ],
  production: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new OptimizeCSSAssetsPlugin(),
    new UglifyJsPlugin(),
  ],
  development: [
    new CheckerPlugin(),
  ]
}

const cssLoader = {
  production: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
    'resolve-url-loader',
    'sass-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [require('autoprefixer')]
      }
    }
  ],
  development: [
    'style-loader',
    'css-loader',
    'resolve-url-loader',
    'sass-loader?sourceMap'
  ]
}

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './src/index.ts'
  },
  output: {
    filename: isProduction ? 'app-[hash].js' : 'app.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: isProduction ? cssLoader.production : cssLoader.development
      },
      {
        test: /\.(jpe?g|png|gif|ico|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false
          }
        }
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useCache: true,
            forceIsolatedModules: true
          }
        }
      }
    ]
  },
  plugins: plugins.common.concat(isProduction ? plugins.production : plugins.development),
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
