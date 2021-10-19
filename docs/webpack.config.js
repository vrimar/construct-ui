const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const packageJson = require('../package.json');

const APP_TITLE = `Construct-ui: ${packageJson.description} - v${packageJson.version}`;
const TEMPLATE_PATH = 'src/index.template.ejs';
const isProduction = process.env.NODE_ENV === 'production';
const PORT = 9000;

const plugins = {
  common: [
    new HTMLPlugin({
      title: APP_TITLE,
      template: TEMPLATE_PATH
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? "production" : "development"),
      'process.env.NODE_DEBUG': JSON.stringify(isProduction ? "production" : "development"),
      VERSION: JSON.stringify(packageJson.version),
    })
  ],
  production: [
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
      chunkFilename: "[id].[fullhash].css"
    }),
  ],
  development: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    })
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
        postcssOptions: {
          plugins: [
            'autoprefixer'
          ],
        }
      }
    }
  ],
  development: [
    'style-loader',
    'css-loader',
    'resolve-url-loader',
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }
  ]
}

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './src/index.ts'
  },
  output: {
    filename: isProduction ? 'app-[fullhash].js' : 'app.js',
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
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  plugins: plugins.common.concat(isProduction ? plugins.production : plugins.development),
  devtool: isProduction ? 'source-map' : 'eval-cheap-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@shared': path.resolve(__dirname, '../src/_shared'),
      '@': path.resolve(__dirname, '../src')
    }
  },
  stats: isProduction ? undefined : "minimal",
  devServer: {
    port: PORT,
    open: true,
  },
  watchOptions: {
    ignored: '**/node_modules'
  }
}
