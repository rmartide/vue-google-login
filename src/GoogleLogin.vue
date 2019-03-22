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
        params: {
            type: Object,
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
        logoutButton: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            const method = this.logoutButton ? 'signOut' : 'signIn';
            GoogleAuth[method]().then(result => {
                return this.onSuccess(result);
            }).catch(err => {
                return this.onFailure(err);
            });
        }
    },
    mounted() {
        GoogleAuth.load(this.params).catch(err => {
            console.log(err);
        });
    }
}
</script>

<style>
</style>
