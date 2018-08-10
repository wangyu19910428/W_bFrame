const baseConfig = require('./webpack.base.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

baseConfig.mode = 'production';

baseConfig.plugins.push(
    new ParallelUglifyPlugin({
        // cacheDir: '.cache/',
        uglifyJS:{
          output: {
            comments: false
          },
          compress: {
            warnings: false
          }
        }
    })
)

baseConfig.plugins.push(
    new CleanWebpackPlugin(['dist/*'])
)

baseConfig.optimization.minimizer = [
    new OptimizeCSSAssetsPlugin({})
]

module.exports = baseConfig;