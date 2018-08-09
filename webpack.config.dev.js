const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const PORT = 5200;
const HOST = '127.0.0.1';

// 本地环境静态资源路径
const localPublicPath = 'http://' + HOST + ':' + PORT + '/';

config.output.publicPath = localPublicPath;

// config.plugins.pop();
config.mode = 'development';
config.devtool = 'inline-source-map';
// config.plugins.push(
    // new webpack.NamedModulesPlugin()
// )
config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
)

new WebpackDevServer(webpack(config), {
  hot:true,
//   inline: true,
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


module.exports = config