'use strict';

module.exports = (appInfo) => {
    if (appInfo.isDev) {
        // eslint-disable-next-line
        console.warn('>>> 当前为本地调试模式，可能需要修改 zkHosts 为私有 IP');
    }

    const config = exports = {};

    let zkHosts;

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

    return config;
};
