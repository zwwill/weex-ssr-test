import Vue from 'vue'
import App from './index.vue'

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例

export function createApp (weex) {
    if(weex && weex.init) weex.init(Vue);
    // const router = createRouter()
    const app = new Vue({
        render: h => h(App),
    })
    return {app}
}
