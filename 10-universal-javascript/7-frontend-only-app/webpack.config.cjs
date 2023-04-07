const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = function(env, argv) {
  const isProd = env === 'production'

  return {
    entry: './src/frontend/index.js',

    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/'
    },

    module: {
      rules: [
        {
          test: /.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        }
      ]
    },

    devtool: isProd ? 'source-maps' : 'eval',

    devServer: {
      historyApiFallback: true,
      open: true
    },

    optimization: isProd ? {
      minimize: true,
      minimizer: [new TerserPlugin()]
    } : {},

    plugins: [new HtmlWebpackPlugin({ title: 'My Library' }), new HtmlWebpackRootPlugin()],
  }
}
