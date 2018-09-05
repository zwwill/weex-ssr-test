'use strict';
const fs = require('fs');
const path = require('path');

if(!global.window) {
    const jsdom = require('jsdom');
    const { JSDOM } = jsdom;
    const window = (new JSDOM(``, {
        pretendToBeVisual: true,
        url: "http://127.0.0.1"
    })).window;
    for (var k in window) {
        if (!global[k]) {
            global[k] = window[k]
        }
    }
    global.window = global;
}

const getClientBubdleFile = pathStr => JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public', pathStr), 'utf-8'));

const Controller = require('egg').Controller;

class SPController extends Controller {
    async auto() {
        const {url} = this.ctx;
        const options = {
            clientManifest: getClientBubdleFile('dist/vue-ssr-client-manifest.json')
        };
        const context = {
            url
        };
        try {
            await this.ctx.render('/bundle/vue-ssr-server-bundle.json', context, options);
        } catch (e) {
            if (e.code === 404) {
                return;
            }

            throw new Error(e);
        }
    }
}

module.exports = SPController;
