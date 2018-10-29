<template>
    <button @click="handleClick">
        <slot></slot>
    </button>
</template>

<script>

import GoogleAuth from './GoogleAuth';

export default {
    name: 'GoogleLogin',
    props: {
        client_id: {
            type: String,
            required: true
        },
        onSuccess: {
            type: Function,
            default: () => { }
        },
        onFailure: {
            type: Function,
            default: () => { }
        },
        signOut: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            const method = this.signOut ? 'signOut' : 'signIn';
            GoogleAuth[method]().then(result => {
                return this.onSuccess(result);
            }).catch(err => {
                return this.onFailure(err);
            });
        }
    },
    mounted() {
        GoogleAuth.load(this.client_id).catch(err => {
            console.log(err);
        });
    }
}
</script>

<style>
</style>
