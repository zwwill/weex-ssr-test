'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    const { router, controller } = app;


    router.get('/error.html', controller.common.error);
    router.get('/404.html', controller.common.notFound);

    router.get('/api/*', controller.common.proxy);
    router.get('*', controller.serverPage.auto);

};
