'use strict'
require('./check-versions')()

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackServerConfig = require('./webpack.server.config')
const webpackClinetConfig = require('./webpack.client.config')
const isProduction = process.env.NODE_ENV === 'production';
// const buildRouter = require('./helper/build-router')

const spinner = ora(isProduction?'build for production...':'local packing...')
const wp = async (webpackConf, side)=>{

    if(!webpackConf) return;

    const compiler = webpack(webpackConf);
    const callback = (err, stats) => {
        if(webpackConf === webpackClinetConfig)spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red(` ${side} bundle build failed with errors.\n`));
            isProduction && process.exit(1)
        }else {

            console.log(chalk.cyan(` ${side} bundle build complete.`))
            !isProduction && console.log(chalk.yellow(' keep watching.\n'))
        }
    };
    if(isProduction){
        compiler.run(callback);
    }else {
        compiler.watch({
            aggregateTimeout: 300,
        }, callback);
    }
}

spinner.start()

rm(path.join(config.build.assetsRoot), async err => {
    if (err) throw err
    // await buildRouter()
    wp(webpackServerConfig,'server')
    wp(webpackClinetConfig,'client')
})
