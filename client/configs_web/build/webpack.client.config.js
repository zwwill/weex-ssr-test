const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

let ccf = {
    entry: '../src/entry-client.js',
    output: {
        path: config.build.assetsClientRoot,
        chunkFilename: '[name].js'
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // a module is extracted into the vendor chunk if...
                return (
                    // it's inside node_modules
                    /weex-vue-render/.test(module.context) ||
                    /node_modules/.test(module.context) &&
                    // and not a CSS file (due to extract-text-webpack-plugin limitation)
                    !/\.css$/.test(module.request)
                )
            }
        }),
        // extract webpack runtime & manifest to avoid vendor chunk hash changing
        // on every build.
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks: 2,
        // }),
        new VueSSRClientPlugin()
    ]
}

if (process.env.NODE_ENV === 'production') {
    ccf.plugins.push(
        // auto generate service worker
        new SWPrecachePlugin({
            cacheId: 'vue-hn',
            filename: 'service-worker.js',
            minify: true,
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
            runtimeCaching: [
                {
                    urlPattern: '/',
                    handler: 'networkFirst'
                },
                {
                    urlPattern: /\/(top|new|show|ask|jobs)/,
                    handler: 'networkFirst'
                },
                {
                    urlPattern: '/item/:id',
                    handler: 'networkFirst'
                },
                {
                    urlPattern: '/user/:id',
                    handler: 'networkFirst'
                }
            ]
        })
    )
}

module.exports = merge(baseWebpackConfig({}), ccf)
