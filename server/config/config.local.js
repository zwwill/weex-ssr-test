'use strict';

const ms = require('ms');
module.exports = () => {
    const config = exports = {};
    config.proxy = {
        proxies: {
            target: {
                host: 'inherit',
                target: `http://127.0.0.1:${Number(8080) + 1}`
            }
        }
    };

    config.mock = {
        port: Number(8080) + 1
    };

    config.vuessr = {
        cache: false,
        renderOptions: {
            directives: {
                mshow(node, dir) {
                    // 基于指令绑定元数据(metadata)转换 vnode
                    let style = node.data.style || (node.data.style = {});
                    if (!dir.value) {
                        if (Array.isArray(style)) {
                            style.push({display: 'none'});
                        } else {
                            style.display = 'none';
                        }
                    }else{
                        if (Array.isArray(style)) {
                            style.push({display: ''});
                        } else {
                            style.display = '';
                        }
                    }

                }
            }
        },
        cachePage: {
            lru: { max: 1000, maxAge: ms('5s') }
        }
    };


    return config;
};
