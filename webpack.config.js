const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('globby')

let pluginCollection = []
let entryMap = {}

//js入口集合
let fileList = glob.sync(['./src/js/*.js'])

for(let i = 0; i < fileList.length; i++) {

  entryMap[path.basename(fileList[i]).split('.')[0]] = fileList[i]

}

//页面集合
let pageList = glob.sync(['./src/page/*.pug'])

for(let i = 0; i < pageList.length; i++) {

  pluginCollection.push(new HtmlWebpackPlugin({
                          inject: false, //禁止所有js注入html文件
                          template: pageList[i], //pug文件位置
                          hash: true,
                          filename: path.basename(pageList[i]).split('.')[0] + '.html' //生成的html文件名字，pug-->html
                        }))

}

pluginCollection.push(new ExtractTextPlugin("[name].css"))  //分离css文件（2/2）


let common = {

  entry:  entryMap,

  output: {
    path: __dirname + "/dist",
    filename: "[name]-[hash].js" //打包后输出文件的文件名
  },

  module: {
    rules: [
      { test: /\.pug$/, loader: 'pug-loader' },
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract({ //分离css文件（1/2）
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'] 
      })},
      { test: /\.png$/, loader: 'file-loader'}
    ]
  },

  plugins: pluginCollection

}

let devConfig = {

  devtool: 'source-map'

}

let releaseConfig = {

  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]

}


module.exports = function(env) {
    switch (env) {
      case 'dev':
        return merge(common, devConfig)
      case 'release':
        return merge(common, releaseConfig)
    }
  }
  