import GoogleAuth from './GoogleAuth';

export default {
    install (Vue, params) {
        Vue.GoogleAuth = GoogleAuth.load(params);
    }
}