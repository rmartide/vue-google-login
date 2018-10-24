<template>
    <LoginButton :client_id="client_id" :onSuccess="onSignIn" :onFailure="onFailure"></LoginButton>
</template>

<script>
import { LoginButton } from '../src/index';
const CLIENT_ID = "672275288589-gdg4j010jalhp5n6gh45333dhuq69liv.apps.googleusercontent.com";

export default {
    name: 'App',
    data() {
        return {
            client_id: CLIENT_ID,
        }
    },
    components: {
        LoginButton
    },
    methods: {
        onSignIn(googleUser) {
            console.log(googleUser);
        },
        onFailure(err) {
            console.log(err)
        }
    }
}
</script>

<style>
</style>
