const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  module: 'production',
  entry: './src/index.js',

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /src\/say-hello\.js$/,
      path.resolve(__dirname, 'src', 'say-hello-browser.js')
    )
  ],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',

        options: {
          plugins: ['syntax-dynamic-import'],

          presets: [
            [
              '@babel/preset-env',
              {
                modules: false
              }
            ]
          ]
        }
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    },
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        mangle: false,
        output: {
          beautify: true
        },
        compress: {
          dead_code: true,
          if_return: true
        }
      }
    })]
  },

  devServer: {
    open: true
  }
}