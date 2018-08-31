'use strict';

module.exports = function(appInfo) {
    if (appInfo.isDev) {
        // eslint-disable-next-line
        console.warn('>>> 当前为本地调试模式，可能需要修改 zkHosts 为私有 IP');
    }

    const config = {};

    if (!zkHosts) {
        if (appInfo.region === 'hz') {
            throw new Error('与后端约定 hz 机房 test env 下的的 zkHosts');
        } else {
            throw new Error('与后端约定 jd 机房 test env 下的的 zkHosts');
        }
    }

    config.webServerDiscovery = {
        zkHosts,
    };

    config.notfound = {
        pageUrl: '/fail.html'
    };

    config.onerror = {
        html(err, ctx) {
            if (ctx.path !== '/error.html') {
                return ctx.redirect('/error.html');
            }
        },
        json(err, ctx) {
            // json hander
            ctx.body = { code: 500, stack: err.stack, message: err.message };
            ctx.status = 500;
        }
    };


    config.cluster = {
        listen: {
            port: Number('9091')
        }
    };

    return config;
};