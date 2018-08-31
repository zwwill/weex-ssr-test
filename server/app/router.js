'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    const { router, controller } = app;


    router.get('/error.html', controller.common.error);
    router.get('/fail.html', controller.common.fail);

    router.get('/hi', controller.home.hi);
    router.get('/', controller.home.home);

    router.get('/api/*', controller.common.proxy);
};
