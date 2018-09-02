import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _2e52ee06 = () => import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
    const _2926477b = () => import('../src/pages/test1' /* webpackChunkName: "pages/test1" */).then(m => m.default || m)
    const _09d93c3b = () => import('../src/pages/test.html.vue' /* webpackChunkName: "pages/test.html" */).then(m => m.default || m)
    const _54f39f60 = () => import('@/pages/test2' /* webpackChunkName: "pages/test2" */).then(m => m.default || m)
    



    const scrollBehavior = function () {}



export function createRouter () {
    return new Router({
        mode: 'history',
        base: '',
        linkActiveClass: '',
        linkExactActiveClass: '',
        scrollBehavior,
        routes: [
            		{
			path: "/",
			component: _2e52ee06,
			name: "Index"
		},
		{
			path: "/test1",
			component: _2926477b,
			name: "Test1"
		},
		{
			path: "/test.html",
			component: _09d93c3b,
			name: "Test"
		},
		{
			path: "/test2",
			component: _54f39f60,
			name: "Test2"
		}
        ],
        
        
            fallback: false
    })
}


