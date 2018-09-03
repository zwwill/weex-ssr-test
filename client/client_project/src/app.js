import Vue from 'vue'
import App from './index.vue'
import weex from 'weex-vue-render';
//
// weex.init(Vue);

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例

export function createApp () {
    // const router = createRouter()
    const app = new Vue({
        render: h => h(App),
    })
    return {app}
}
