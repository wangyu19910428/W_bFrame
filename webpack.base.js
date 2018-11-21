const webpack = require('webpack');
const utils  = require('./utils');//公用方法
const SRC_PATH = utils.fullPath('src');
const DIST_PATH = utils.fullPath('dist');
// const package = require('./package.json');
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
                include: SRC_PATH,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-1', 'env'],
                        plugins: [['import', {libraryName:'antd',libraryDirectory: "es", style:'css'}]]
                    }
                }
            },
            // {
            //     test:/(\.jsx|\.js)$/,
            //     exclude: /node_modules/,
            //     loader:'babel-loader',
            //     query:
            //         {
            //             presets:["env", "react"],
            //             plugins: [
            //                 [
            //                     "import",
            //                     {libraryName: "antd", style: 'css'}
            //                 ] //antd按需加载
            //             ]
            //         },
            // },
            // {
            //     test: /\.(c|sa|sc)ss$/,
            //     exclude: '/node_modules/',
            //     // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            //     use: [__DEV__? 'style-loader': MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            // },
            
            {//css处理
                test:/\.css$/,
                exclude: /node_modules/,
                use:[
                    __DEV__? 'style-loader': MiniCssExtractPlugin.loader, 
                    // 'css-loader'
                    {
                        loader: "css-loader",
                        // options:{
                        //     importLoaders:1
                        // }
                    }
                ]
            },
            {//antd样式处理
                test:/\.css$/,
                exclude: SRC_PATH,
                use:[
                    __DEV__? 'style-loader': MiniCssExtractPlugin.loader, 
                    // 'css-loader'
                    {
                        loader: "css-loader",
                        options:{
                            importLoaders:1
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                use: [
                      {  loader:  __DEV__? 'style-loader': MiniCssExtractPlugin.loader  },
                      {  loader: "css-loader" },
                      {
                         loader: "postcss-loader",//自动加前缀
                         options: {
                                plugins:[
                                       require('autoprefixer')({
                                           browsers:['last 5 version']
                                       })
                               ]
                         }
                      },
                      {  loader: "less-loader" }
                  ]
             },
            {
                test: /\.(sc|sa)ss$/,
                use: [
                { loader: __DEV__? 'style-loader': MiniCssExtractPlugin.loader },
                {
                    loader: "css-loader",
                },
                { loader: "sass-loader" },
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
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                        outputPath: './img'
                    }
                }]
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
            Component: ['react', 'Component'],
            BrowserRouter: ['react-router-dom', 'BrowserRouter'],
            browserHistory: ['react-router-dom', 'browserHistory'],
            Route: ['react-router-dom', 'Route'],
            Link: ['react-router-dom', 'Link'],
            Switch: ['react-router-dom', 'Switch'],
            Redirect: ['react-router-dom', 'Redirect']
        }),
        new MiniCssExtractPlugin({
            filename: __DEV__? 'css/[name].css': 'css/[name]-[hash:8].css',
            chunkFilename: __DEV__ ? 'css/[name].css' : 'css/[name]-[hash:8].css',
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                vendor: {
                    chunks:"all",
                    test: /[\\/]node_modules[\\/]/,
                    name:"vendor",
                    minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority:100,
                    // enforce: true?
                }
            }
        }
    }
}

module.exports = options;