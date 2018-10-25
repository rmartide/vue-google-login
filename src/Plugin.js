import GoogleAuth from './GoogleAuth';

export default {
    install (Vue, {client_id}) {
        GoogleAuth.load(client_id).then(auth2 => {
            Vue.GoogleAuth = auth2;
        })
    }
}