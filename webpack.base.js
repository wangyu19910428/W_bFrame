const webpack = require('webpack');
const utils  = require('./utils');//公用方法
const SRC_PATH = utils.fullPath('src');
const DIST_PATH = utils.fullPath('dist');
const NODE_MODULES = utils.fullPath('node_modules');

const CopyWebpackPlugin = require('copy-webpack-plugin');
//插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const __DEV__ = process.argv[3] !== 'webpack.pro.js';

//复制index.html 模板配置数据
let HtmlPluginOptions = {
    filename: utils.fullPath('index.html'),
    chunks: ['main','vendor'],
    template: SRC_PATH + '/tpl.html'
};

__DEV__? HtmlPluginOptions.alwaysWriteToDisk = true: null;

let options = {
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
                include: SRC_PATH,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['react', 'env', 'stage-1'],
                        plugins: [
                            ['import', {libraryName:'antd',libraryDirectory: "es", style:'css'}]]
                    }
                }
            },
            {//antd样式处理
                test:/\.css$/,
                use:[
                    // MiniCssExtractPlugin.loader, 
                    __DEV__? 'style-loader': MiniCssExtractPlugin.loader, 
                    {
                        loader: "css-loader",
                        options:{
                            importLoaders:1//
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['last 5 version']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(sc|sa)ss$/,
                exclude: NODE_MODULES,
                include: SRC_PATH,
                // use: [ 'style-loader' , "css-loader", "sass-loader"], 
                use: [ __DEV__? 'style-loader': MiniCssExtractPlugin.loader , "css-loader", "sass-loader", {
                    loader: "postcss-loader",
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                browsers: ['last 5 version']
                            })
                        ]
                    }
                }]
            },
            {
                test: /\.less$/,
                exclude: NODE_MODULES,
                include: SRC_PATH,
                // use: [ MiniCssExtractPlugin.loader , "css-loader", "sass-loader", 
                // use: [ 'style-loader' , "css-loader", "sass-loader"], 
                use: [ __DEV__? 'style-loader': MiniCssExtractPlugin.loader , "css-loader", "less-loader", {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['last 5 version']
                                })
                            ]
                        }
                    }]
            },
            {
                test: /\.(png|jpg|jpge|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                        outputPath: './img',
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.svg$/, //处理svg
                loader: 'svg-sprite-loader',
                include: [SRC_PATH + '/assets']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(HtmlPluginOptions),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Component: ['react', 'Component'],
            BrowserRouter: ['react-router-dom', 'BrowserRouter'],
            browserHistory: ['react-router-dom', 'browserHistory'],
            Route: ['react-router-dom', 'Route'],
            Link: ['react-router-dom', 'Link'],
            Switch: ['react-router-dom', 'Switch'],
            Redirect: ['react-router-dom', 'Redirect'],
            Loadable: 'react-loadable'
        }),
        new MiniCssExtractPlugin({
            filename: __DEV__? 'css/[name].css': 'css/[name]-[hash:8].css',
            chunkFilename: __DEV__ ? 'css/[name].css' : 'css/[name]-[hash:8].css',
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '-',
            cacheGroups: {
                vendor: {
                    chunks:"initial",
                    // test: /[\\/]node_modules[\\/]/,
                    name:"vendor",
                    // minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
                    // maxInitialRequests: 5,
                    // minSize: 0,
                    // priority:-10,
                    enforce: true
                }
            },
        }
    }
}

//把src下面的BaseJs下的文件复制到dist下面 主要是引用外部js和其他一些非编译的资源
options.plugins.push(
    new CopyWebpackPlugin([{
        from: SRC_PATH + '/BaseJs',
        to: DIST_PATH + '/src/BaseJs'
    }])
)

module.exports = options;