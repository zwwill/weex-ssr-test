'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async fail() {
        await this.ctx.render('ERROR_404.html');
    }
    async error() {
        await this.ctx.render('ERROR_500.html');
    }
    async proxy() {
        await this.ctx.proxyTo('target').response();
    }
}

module.exports = HomeController;
