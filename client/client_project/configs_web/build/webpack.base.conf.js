'use strict'
const path = require('path')
const config = require('../config')
const modules = require('./module')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = (conf)=> {

    return {
        context: path.resolve(__dirname, '../'),
        output: {
            path: config.build.assetsRoot,
            filename: process.env.NODE_ENV === 'production'?'[name].[chunkhash:8].js':'[name].js',
            chunkFilename: process.env.NODE_ENV === 'production'?'[name].[chunkhash:8].js':'[name].js',
            publicPath: config.build.assetsPublicPath
        },
        devtool: process.env.NODE_ENV !== 'production'? 'source-map' : '',
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src')
            }
        },
        module: modules(config),
        node: {
            // prevent webpack from injecting useless setImmediate polyfill because Vue
            // source contains it (although only uses it if it's native).
            setImmediate: false,
            // prevent webpack from injecting mocks to Node native modules
            // that does not make sense for the client
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        },
        plugins: [
            // new ExtractTextPlugin({
            //     filename: process.env.NODE_ENV === 'production'?'[name].[chunkhash:8].css':'[name].css',
            //     allChunks: true
            // }),
            // copy template layout file to server view folder
            new CopyWebpackPlugin([{
                from: {
                    glob: path.resolve(__dirname, '../../src/template/**/*.html'),
                    dot: false,
                },
                to: path.resolve(__dirname, '../../../../server/app/view'),
                context: path.resolve(__dirname, '../../src/template'),
                force: false,
            }])
        ]
    }
}
