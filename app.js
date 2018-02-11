const config = {
    port: '8086',
    output: './dist'
}
const fs = require('fs')
const express = require('express')
const webpack = require('webpack')
const webpack_config = require('./webpack.config')('dev')
var app = express()
const output = './dist'
//webpack打包监控
const compiler = webpack(webpack_config)
compiler.watch({
    aggregateTimeout: 300,
}, function (err, stats) {
    console.log(stats.toString({
      color: true
    }))
  })
//本地服务
app.use(function (req, res, next) {
    console.log('%s %s - %s', new Date().toISOString(), req.method, req.url)
    return next()
  })
app.use('/', express.static(config.output))
app.listen(config.port, function () {
    console.log([
      'Listening on port ' + config.port + ',',
    ].join('\n'))
  })
  