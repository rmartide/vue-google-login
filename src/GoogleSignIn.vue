<template>
    <button @click="handleClick">
        <slot></slot>
    </button>
</template>

<script>

import GoogleAuth from './GoogleAuth';
import GoogleLogo from './GoogleLogo.vue';

export default {
    name: 'GoogleSignIn',
    components: {
        GoogleLogo
    },
    props: {
        client_id: String,
        onSuccess: {
            type: Function,
            default: () => { }
        },
        onFailure: {
            type: Function,
            default: () => { }
        },
        logout: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            const method = this.logout ? 'signOut' : 'signIn';
            GoogleAuth[method]().then(result => {
                return this.onSuccess(result);
            }).catch(err => {
                return this.onFailure(err);
            });
        }
    },
    mounted() {
       /*  GoogleAuth.load(this.client_id).then(auth2 => {
            console.log(auth2)
        }).catch(err => {
            console.log(err);
        }); */
    }
}
</script>

<style>
</style>
