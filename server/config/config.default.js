'use strict';

module.exports = function(appInfo) {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = `${appInfo.name}_1535544303447_3479`;

    // add your config here
    config.middleware = [];

    config.siteFile = {
        '/favicon.ico': 'https://haitao.nos.netease.com/25ab9d19-4fba-4ef7-8907-e8ff22a64fe4.ico'
    };

    config.viewArtTemplate = {
        imports: require('../app/helper')
    };

    config.proxies = {};

    config.webServerDiscovery = {
        zkHosts: void 0,
        timeout: 5000,
        webServers: {
            mobile: {
                application: 'kaola-mykaola-web', // 后端服务的 appName
                env: appInfo.kaolaEnv,
                host: 'm-user.kaola.com', // 后端服务的 Host
                checkHealth: false, // checkHealth 开启 true，Node.js 端会发起 5s 一次的健康检查
            },
        },
    };


    config.httpclient = {
        enableDNSCache: true
    };

    config.security = {
        csrf: {
            enable: true
        }
    };

    config.cluster = {
        listen: {
            port: Number('3003')
        }
    };

    return config;
};
