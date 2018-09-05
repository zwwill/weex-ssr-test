
import weex from 'weex-vue-render';
// import weex from '../../../../weex/weex-vue-render';
import { createApp } from './app'

export default context => {
    const { app } = createApp(weex)
    return app
}