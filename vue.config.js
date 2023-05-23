/*
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-04-16 23:16:23
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-07-04 14:50:14
 */
const name = process.env.VUE_APP_TITLE
// const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  publicPath: './',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.TARGET,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }

    }
  },
  configureWebpack: {
    name: name,

    plugins: [

    ]
  }
}
