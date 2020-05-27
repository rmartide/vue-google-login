(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global['vue-google-login'] = {}));
}(this, (function (exports) { 'use strict';

    var auth2;
    var loadingPromise;

    var createScript = function createScript() {
      return new Promise(function (resolve, reject) {
        var el = document.getElementById('auth2_script_id');

        if (!el) {
          var gplatformScript = document.createElement('script');
          gplatformScript.setAttribute('src', 'https://apis.google.com/js/platform.js?onload=onGapiLoad');
          gplatformScript.setAttribute("async", true);
          gplatformScript.setAttribute("defer", "defer");
          gplatformScript.setAttribute("id", "auth2_script_id");
          document.head.appendChild(gplatformScript);
        }

        resolve();
      });
    };

    var onGapiLoadPromise = function onGapiLoadPromise(params) {
      return new Promise(function (resolve, reject) {
        window.onGapiLoad = function () {
          window.gapi.load('auth2', function () {
            try {
              auth2 = window.gapi.auth2.init(Object.assign({}, params));
            } catch (err) {
              reject({
                err: 'client_id missing or is incorrect, or if you added extra params maybe they are written incorrectly, did you add it to the component or plugin?'
              });
            }

            resolve(auth2);
          });
        };
      });
    };

    var loadingAuth2 = function loadingAuth2(params) {
      if (auth2) {
        return Promise.resolve(auth2);
      } else {
        if (!loadingPromise) loadingPromise = onGapiLoadPromise(params);
        return loadingPromise;
      }
    };

    var load = function load(params) {
      return Promise.all([loadingAuth2(params), createScript()]).then(function (results) {
        return results[0];
      });
    };

    var wrapper = function wrapper(f, method) {
      if (f) return f[method]();else {
        var err = {
          err: 'Script not loaded correctly, did you added the plugin or the client_id to the component?'
        };
        return Promise.reject(err);
      }
    };

    var signIn = function signIn() {
      return wrapper(auth2, 'signIn');
    };

    var signOut = function signOut() {
      return wrapper(auth2, 'signOut');
    };

    var isSignedIn = function isSignedIn() {
      return wrapper(auth2.isSignedIn, 'get');
    };

    var currentUser = function currentUser() {
      return wrapper(auth2.currentUser, 'get');
    };

    var grantOfflineAccess = function grantOfflineAccess() {
      return wrapper(auth2, 'grantOfflineAccess');
    };

    var GoogleAuth = {
      load: load,
      signIn: signIn,
      signOut: signOut,
      isSignedIn: isSignedIn,
      currentUser: currentUser,
      grantOfflineAccess: grantOfflineAccess
    };

    //
    //
    //
    //
    //
    //
    //
    //
    var componentId = 0;
    var script = {
      name: 'GoogleLogin',
      props: {
        params: {
          type: Object,
          required: true
        },

        /* offline: {
        	type: Boolean,
        	default: false
        }, */
        onCurrentUser: {
          type: Function,
          default: function _default() {}
        },
        onSuccess: {
          type: Function,
          default: function _default() {}
        },
        onFailure: {
          type: Function,
          default: function _default() {}
        },
        logoutButton: {
          type: Boolean,
          default: false
        },
        renderParams: {
          type: Object,
          required: false
        }
      },
      beforeCreate: function beforeCreate() {
        this.id = "google-signin-btn-".concat(componentId++);
      },
      methods: {
        handleClick: function handleClick() {
          var _this = this;

          /* if (this.offline) {
          	GoogleAuth['grantOfflineAccess']({ 'redirect_uri': 'postmessage' }).then(result => {
          		return this.onSuccess(result);
          	}).catch(err => {
          		return this.onFailure(err);
          	});
          } else {
          } */
          var method = this.logoutButton ? 'signOut' : 'signIn';
          GoogleAuth[method]().then(function (result) {
            return _this.onSuccess(result);
          }).catch(function (err) {
            return _this.onFailure(err);
          });
        }
      },
      mounted: function mounted() {
        var _this2 = this;

        GoogleAuth.load(this.params).then(function () {
          if (_this2.renderParams && _this2.logoutButton === false) {
            window.gapi.signin2.render(_this2.id, _this2.renderParams);
          }

          if (GoogleAuth.isSignedIn()) {
            _this2.onCurrentUser(GoogleAuth.currentUser());
          }
        }).catch(function (err) {
          console.log(err);
        });
      }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function () {
          style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    var normalizeComponent_1 = normalizeComponent;

    /* script */
    var __vue_script__ = script;
    /* template */

    var __vue_render__ = function __vue_render__() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _vm.renderParams && !_vm.logoutButton ? _c('div', {
        attrs: {
          "id": _vm.id
        },
        on: {
          "click": _vm.handleClick
        }
      }) : _c('button', {
        attrs: {
          "id": _vm.id
        },
        on: {
          "click": _vm.handleClick
        }
      }, [_vm._t("default")], 2);
    };

    var __vue_staticRenderFns__ = [];
    /* style */

    var __vue_inject_styles__ = undefined;
    /* scoped */

    var __vue_scope_id__ = undefined;
    /* module identifier */

    var __vue_module_identifier__ = undefined;
    /* functional template */

    var __vue_is_functional_template__ = false;
    /* style inject */

    /* style inject SSR */

    var GoogleLogin = normalizeComponent_1({
      render: __vue_render__,
      staticRenderFns: __vue_staticRenderFns__
    }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

    var LoaderPlugin = {
      install: function install(Vue, params) {
        Vue.GoogleAuth = GoogleAuth.load(params);
      }
    };

    exports.GoogleLogin = GoogleLogin;
    exports.LoaderPlugin = LoaderPlugin;
    exports.default = GoogleLogin;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
