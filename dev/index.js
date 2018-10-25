import Vue from 'vue'
import App from './App.vue'
import Plugin from '../src/Plugin.js';
Vue.config.productionTip = false
const CLIENT_ID = "672275288589-gdg4j010jalhp5n6gh45333dhuq69liv.apps.googleusercontent.com";

Vue.use(Plugin, {
    client_id: CLIENT_ID
});

new Vue({
    render: h => h(App)
}).$mount('#app')
