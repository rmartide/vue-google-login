import Vue from 'vue'
import App from './App.vue'
import { LoaderPlugin } from '../dist/vue-google-login.min';
// import { LoaderPlugin } from '../src/';
Vue.config.productionTip = false
const CLIENT_ID = "672275288589-gdg4j010jalhp5n6gh45333dhuq69liv.apps.googleusercontent.com";

Vue.use(LoaderPlugin, {
    client_id: CLIENT_ID
});

new Vue({
    render: h => h(App)
}).$mount('#app')
