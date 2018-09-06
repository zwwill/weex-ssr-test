const jsdom = require('jsdom');
const { JSDOM } = jsdom;
if(!global.window) {
    const window = (new JSDOM('', {
        pretendToBeVisual: true,
        url: 'http://localhost:8090'
    })).window;
    global.window = window;
    for (let k in window) {
        if (!global[k]) {
            global[k] = window[k];
        }
    }
}

console.log('window', window);