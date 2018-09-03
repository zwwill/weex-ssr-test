// const jsdom = require("jsdom");
// global.window = new JSDOM(`<!DOCTYPE html>`).window;
global.window = {e:123}
console.log('global.window',global.window)
console.log('window',window)

import { createApp } from './app'

export default context => {
    const { app } = createApp()
    return app
}