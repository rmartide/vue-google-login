import {load} from './GoogleAuth';

export default {
    install (Vue, {client_id}) {
        load(client_id);
    }
}