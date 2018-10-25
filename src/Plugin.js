import {load} from './GoogleAuthPromises';

export default {
    install (Vue, {client_id}) {
        load(client_id).then(auth2 => {
            console.log(auth2);
        })
    }
}