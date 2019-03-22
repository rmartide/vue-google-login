// bili.config.js
module.exports = {
    plugins: {
      vue: true,
      // or with custom options
      // vue: {}
    },
    output: {
        moduleName: "vue-google-login",
        fileName: "vue-google-login[min].js",
        format: ['umd', 'umd-min']
    }
  }