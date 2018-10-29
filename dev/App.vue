<template>
    <div>
        <GoogleLogin :client_id="client_id" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>
        <GoogleLogin :client_id="client_id" :signOut=true class="button-style">Logout</GoogleLogin>
        <button @click="handleClick">isLoggedIn</button>
    </div>
</template>

<script>
import GoogleLogin from '../dist/vue-google-login.min.js';
const CLIENT_ID = "672275288589-gdg4j010jalhp5n6gh45333dhuq69liv.apps.googleusercontent.com";
import Vue from 'vue';

export default {
    name: 'App',
    data() {
        return {
            client_id: CLIENT_ID
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        onSuccess(googleUser) {
            console.log(googleUser);
        },
        onFailure(err) {
            console.log(err)
        },
        handleClick() {
            Vue.GoogleAuth.then(auth2 => {
                console.log(auth2.isSignedIn.get());
            })
        }
    }
}
</script>

<style>
.button-style {
  color: white;
  background: red;
  padding: 10px;
}
</style>
