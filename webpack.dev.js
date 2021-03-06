const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.base.js');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const PORT = 5200;
const HOST = '127.0.0.1';
//3
// 本地环境静态资源路径
const localPublicPath = 'http://' + HOST + ':' + PORT + '/';
config.devtool = 'inline-source-map';
config.mode = 'development'; 

config.output.publicPath = localPublicPath;

config.plugins.push(
    new HtmlWebpackHarddiskPlugin()
)

new WebpackDevServer(webpack(config), {
  hot:true,
  inline: true,
  compress: true,
  stats: {
    chunks: false,
    children: false,
    colors: true
  },
  historyApiFallback: true,
}).listen(PORT, HOST, function() {
  console.log(localPublicPath);
});
// config.devtool = 'inline-source-map';
// config.devtool = '#eval-cheap-module-source-map';
// config.plugins.push(
    // new webpack.NamedModulesPlugin()
// )
// config.plugins.push(
    // new webpack.HotModuleReplacementPlugin()
// )




module.exports = config