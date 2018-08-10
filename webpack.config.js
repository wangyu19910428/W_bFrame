const webpack = require('webpack');
const utils  = require('./utils');//公用方法
const SRC_PATH = utils.fullPath('src');
const DIST_PATH = utils.fullPath('dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

let options = {
    mode: 'production',
    entry: {
        app: SRC_PATH + '/router.js',
        vendor: Object.keys(package.dependencies)
    },
    output: {
        filename: 'js/[name].js',
        path: DIST_PATH,
        publicPath: './',
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
            },
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: utils.fullPath('index.html'),
            chunks: ['app','vendor'],
            template: SRC_PATH + '/tpl.html'
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Component: ['react', 'Component']
        }),
        // new CleanWebpackPlugin(['dist/*'])
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority:100
                }
            }
        },
        // runtimeChunk: {
            // name: 'manifest'
        // }
    }
}

module.exports = options;