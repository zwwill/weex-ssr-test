'use strict';
const fs = require('fs');

const Controller = require('egg').Controller;

class CommonController extends Controller {
    async notFound() {
        
        this.ctx.body = this.readFile('app/view/404.html');
    }
    readFile(file) {
        return fs.readFileSync(file, 'utf8');
    }
    async error() {
        this.ctx.body = this.readFile('app/view/error.html');
    }
    async proxy() {
        await this.ctx.proxyTo('target').response();
    }
}

module.exports = CommonController;
