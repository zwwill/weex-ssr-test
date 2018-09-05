webpackJsonp([0],{

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createApp;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_vue__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_vue__);



// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例

function createApp (weex) {
    if(weex && weex.init) weex.init(__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]);
    // const router = createRouter()
    const app = new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
        render: h => h(__WEBPACK_IMPORTED_MODULE_1__index_vue___default.a),
    })
    return {app}
}


/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(174)
}
var Component = __webpack_require__(60)(
  /* script */
  __webpack_require__(175),
  /* template */
  __webpack_require__(178),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1210704f",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zwwill/workspace/netease/git/kaola/kaola-weex-ssr/client/src/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1210704f", Component.options)
  } else {
    hotAPI.reload("data-v-1210704f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 174:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _HelloWorld = __webpack_require__(176);

var _HelloWorld2 = _interopRequireDefault(_HelloWorld);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modal = void 0,
    animation = void 0; //
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'App',
    components: {
        HelloWorld: _HelloWorld2.default
    },
    data: function data() {
        return {
            logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png'
        };
    },
    mounted: function mounted() {
        modal = weex.requireModule('modal');
        animation = weex.requireModule('animation');

        modal.toast({
            message: 'This is a toast',
            duration: 2
        });
    },

    methods: {
        move: function move() {
            var testEl = this.$refs.test;
            animation.transition(testEl, {
                styles: {
                    backgroundColor: '#FF0000',
                    transform: 'translate(0px, 100px) scale(2)',
                    transformOrigin: 'center center'
                },
                duration: 800, //ms
                timingFunction: 'ease',
                delay: 0 //ms
            }, function () {
                modal.toast({ message: 'animation finished.' });
            });
        }
    }
};

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(60)(
  /* script */
  null,
  /* template */
  __webpack_require__(177),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/zwwill/workspace/netease/git/kaola/kaola-weex-ssr/client/src/components/HelloWorld.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] HelloWorld.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7fae2ed4", Component.options)
  } else {
    hotAPI.reload("data-v-7fae2ed4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "message weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v("Now, let's use Vue.js to build your Weex app.")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7fae2ed4", module.exports)
  }
}

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper weex-root weex-ct weex-div",
    attrs: {
      "id": "app",
      "weex-type": "div"
    }
  }, [_c('figure', {
    staticClass: "logo weex-el weex-image",
    attrs: {
      "src": _vm.logo,
      "data-img-src": _vm.logo,
      "weex-type": "image"
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "greeting weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v("The environment is ready!")]), _vm._v(" "), _c('HelloWorld'), _vm._v(" "), _c('div', {
    ref: "test",
    staticClass: "box weex-ct weex-div",
    attrs: {
      "weex-type": "div",
      "data-evt-click": ""
    },
    on: {
      "click": _vm.$stopOuterA,
      "weex$tap": function($event) {
        $event.stopPropagation();
        return _vm.move($event)
      }
    }
  }, [_c('p', {
    staticClass: " weex-el weex-text",
    attrs: {
      "weex-type": "text"
    }
  }, [_vm._v("click")])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1210704f", module.exports)
  }
}

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__weex_weex_vue_render__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(171);
// import weex from 'weex-vue-render';



// 客户端特定引导逻辑……

const { app } = Object(__WEBPACK_IMPORTED_MODULE_1__app__["a" /* createApp */])(__WEBPACK_IMPORTED_MODULE_0__weex_weex_vue_render__["a" /* default */])

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount('#app')

/***/ })

},[61]);
//# sourceMappingURL=main.js.map