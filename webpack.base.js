const webpack = require('webpack');
const utils  = require('./utils');//公用方法
const SRC_PATH = utils.fullPath('src');
const DIST_PATH = utils.fullPath('dist');
const package = require('./package.json');
//插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const __DEV__ = process.argv[3] !== 'webpack.pro.js';

let options = {
    mode: 'production',
    entry: {
        app: SRC_PATH + '/router.js'
        // vendor: Object.keys(package.dependencies)
    },
    output: {
        filename: __DEV__? 'js/[name].js': 'js/[name]-[hash:8].js',
        path: DIST_PATH,
        publicPath: './',
        chunkFilename: __DEV__? 'js/[name].js': 'js/[name]-[hash:8].js'
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
                test: /\.(c|sa|sc)ss$/,
                exclude: '/node_modules/',
                use: [__DEV__? 'style-loader': MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
        new MiniCssExtractPlugin({
            filename: __DEV__? 'css/[name].css': 'css/[name].[hash:8].css',
            // chunkFilename: __DEV__ ? '[id].css' : '[id].[hash:8].css',
        })
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
        }
    }
}

module.exports = options;