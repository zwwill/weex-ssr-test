import weex from 'weex-vue-s-render';
import 'weex-vue-s-render/dist/css/bundle.css';
import { createApp } from './app'

export default context => {
    const { app } = createApp(weex)
    return app
}