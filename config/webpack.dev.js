const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const { merge } = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const commonConfig = require('./webpack.common');
const { resolveRoot } = require('./helpers');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    path: resolveRoot('dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { esModule: false } },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [new HotModuleReplacementPlugin(), new FriendlyErrorsPlugin()],
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    // open: true,
    overlay: true,
    port: 9000,
    stats: {
      normal: true,
    },
  },
});
