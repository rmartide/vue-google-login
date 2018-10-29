(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global['vue-google-login'] = {})));
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

    var onGapiLoadPromise = function onGapiLoadPromise(client_id) {
      return new Promise(function (resolve, reject) {
        window.onGapiLoad = function () {
          window.gapi.load('auth2', function () {
            try {
              auth2 = window.gapi.auth2.init({
                client_id: client_id
              });
            } catch (err) {
              reject({
                err: 'client_id missing or is incorrect, did you add it to the component or plugin?'
              });
            }

            resolve(auth2);
          });
        };
      });
    };

    var loadingAuth2 = function loadingAuth2(client_id) {
      if (auth2) {
        return Promise.resolve(auth2);
      } else {
        if (!loadingPromise) loadingPromise = onGapiLoadPromise(client_id);
        return loadingPromise;
      }
    };

    var load = function load(client_id) {
      return Promise.all([loadingAuth2(client_id), createScript()]).then(function (results) {
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

    var GoogleAuth = {
      load: load,
      signIn: signIn,
      signOut: signOut
    };

    //
    var script = {
      name: 'GoogleLogin',
      props: {
        client_id: {
          type: String,
          required: true
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
        }
      },
      methods: {
        handleClick: function handleClick() {
          var _this = this;

          var method = this.logoutButton ? 'signOut' : 'signIn';
          GoogleAuth[method]().then(function (result) {
            return _this.onSuccess(result);
          }).catch(function (err) {
            return _this.onFailure(err);
          });
        }
      },
      mounted: function mounted() {
        GoogleAuth.load(this.client_id).catch(function (err) {
          console.log(err);
        });
      }
    };

    /* script */
                const __vue_script__ = script;
                
    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "button",
        { on: { click: _vm.handleClick } },
        [_vm._t("default")],
        2
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = function (inject) {
        if (!inject) return
        inject("data-v-93aeb9a2_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"GoogleLogin.vue"}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* component normalizer */
      function __vue_normalize__(
        template, style, script$$1,
        scope, functional, moduleIdentifier,
        createInjector, createInjectorSSR
      ) {
        const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

        // For security concerns, we use only base name in production mode.
        component.__file = "C:\\Projects\\Vue\\vue-google-login\\src\\GoogleLogin.vue";

        if (!component.render) {
          component.render = template.render;
          component.staticRenderFns = template.staticRenderFns;
          component._compiled = true;

          if (functional) component.functional = true;
        }

        component._scopeId = scope;

        {
          let hook;
          if (style) {
            hook = function(context) {
              style.call(this, createInjector(context));
            };
          }

          if (hook !== undefined) {
            if (component.functional) {
              // register for functional component in vue file
              const originalRender = component.render;
              component.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context)
              };
            } else {
              // inject component registration as beforeCreate hook
              const existing = component.beforeCreate;
              component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
          }
        }

        return component
      }
      /* style inject */
      function __vue_create_injector__() {
        const head = document.head || document.getElementsByTagName('head')[0];
        const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
        const isOldIE =
          typeof navigator !== 'undefined' &&
          /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

        return function addStyle(id, css) {
          if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

          const group = isOldIE ? css.media || 'default' : id;
          const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

          if (!style.ids.includes(id)) {
            let code = css.source;
            let index = style.ids.length;

            style.ids.push(id);

            if (isOldIE) {
              style.element = style.element || document.querySelector('style[data-group=' + group + ']');
            }

            if (!style.element) {
              const el = style.element = document.createElement('style');
              el.type = 'text/css';

              if (css.media) el.setAttribute('media', css.media);
              if (isOldIE) {
                el.setAttribute('data-group', group);
                el.setAttribute('data-next-index', '0');
              }

              head.appendChild(el);
            }

            if (isOldIE) {
              index = parseInt(style.element.getAttribute('data-next-index'));
              style.element.setAttribute('data-next-index', index + 1);
            }

            if (style.element.styleSheet) {
              style.parts.push(code);
              style.element.styleSheet.cssText = style.parts
                .filter(Boolean)
                .join('\n');
            } else {
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index]) style.element.removeChild(nodes[index]);
              if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
              else style.element.appendChild(textNode);
            }
          }
        }
      }
      /* style inject SSR */
      

      
      var GoogleLogin = __vue_normalize__(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        __vue_create_injector__,
        undefined
      )

    var LoaderPlugin = {
      install: function install(Vue, _ref) {
        var client_id = _ref.client_id;
        Vue.GoogleAuth = GoogleAuth.load(client_id);
      }
    };

    exports.default = GoogleLogin;
    exports.GoogleLogin = GoogleLogin;
    exports.LoaderPlugin = LoaderPlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
