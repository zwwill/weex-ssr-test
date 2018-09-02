import { createApp } from './app'
import {getLocation, flatMapComponents, applyAsyncData, sanitizeComponent} from '../build/helper/utils'
// 客户端特定引导逻辑……

function applySSRData(Component, ssrData) {
  if (window.__INITIAL_STATE__ && ssrData) {
    applyAsyncData(Component, ssrData)
  }
  Component._Ctor = Component
  return Component
}

// Get matched components
function resolveComponents(router) {
  const path = getLocation(router.options.base, router.options.mode)

  return flatMapComponents(router.match(path), async (Component, _, match, key, index) => {
    // If component is not resolved yet, resolve it
    if (typeof Component === 'function' && !Component.options) {
      Component = await Component()
    }
    // Sanitize it and save it
    const _Component = applySSRData(sanitizeComponent(Component), window.__INITIAL_STATE__ ?  window.__INITIAL_STATE__[index] : null)
    match.components[key] = _Component
    return _Component
  })
}

const { app, router, store } = createApp()
// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(async () => {
  // 开始挂载到dom上
  if (store) {
    if (window.__INITIAL_STATE__) {
      store.replaceState(window.__INITIAL_STATE__)
    }
  } else {
    await resolveComponents(router)
  }

  app.$mount('#app')
})
