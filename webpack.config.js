const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

let common = {

}

let devConfig = {

}

let releaseConfig = {

}


module.exports = function(env) {
    switch (env) {
      case 'dev':
        return merge(common, devConfig)
      case 'release':
        return merge(common, releaseConfig)
    }
  }
  