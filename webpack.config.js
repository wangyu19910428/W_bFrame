
const utils  = require('./utils');//公用方法
const SRC_PATH = utils.fullPath('src');
const DIST_PATH = utils.fullPath('dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let options = {
    devtool: 'inline-source-map',
    mode: 'development',
    entry: {
        app: SRC_PATH + '/router.js'
    },
    output: {
        filename: 'js/[name].js',
        path: DIST_PATH,
        publickPath: '/',
        chunkFilename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-1']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: utils.fullPath('./') + '/index.html',
            template: SRC_PATH + '/tpl.html'
        }),
        new CleanWebpackPlugin(['dist/*'])
    ]
}

module.exports = options;