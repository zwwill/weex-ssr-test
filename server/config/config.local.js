'use strict';

module.exports = () => {
    const config = exports = {};
    config.proxy = {
        proxies: {
            target: {
                host: 'inherit',
                target: `http://127.0.0.1:${ Number( 3003 ) + 1 }`
            }
        }
    };

    config.mock = {
        port: Number( 3003 ) + 1
    };

    return config;
};
