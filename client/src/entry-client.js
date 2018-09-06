// import weex from 'weex-vue-render';
// import weex from 'weex-vue-s-render';
import weex from '../../../../weex/weex-vue-render';
import { createApp } from './app'

// 客户端特定引导逻辑……

const { app } = createApp(weex)

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount('#app')