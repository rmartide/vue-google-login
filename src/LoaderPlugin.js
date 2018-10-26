import GoogleAuth from './GoogleAuth';

export default {
    install (Vue, {client_id}) {
        Vue.GoogleAuth = GoogleAuth.load(client_id);
    }
}