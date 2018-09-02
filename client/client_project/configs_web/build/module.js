'use strict'
const path = require('path')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = (config)=> {
    let styleloaders = [],
        createLintingRule = {
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src'), resolve('test')],
            options: {
                formatter: require('eslint-friendly-formatter'),
                emitWarning: !config.dev.showEslintErrorsInOverlay
            }
        };

    styleloaders = process.env.NODE_ENV === 'production'
        ? utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: config.build.extract,
            usePostCSS: true
        })
        : utils.styleLoaders({sourceMap: config.dev.cssSourceMap, extract: config.dev.extract, usePostCSS: true})

    return {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule] : []),
            ...styleloaders,
            {
                test: /\.(html|rgl)$/, loader: "html-withimg-loader"
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('build')]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 2000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 2000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 2000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
