<template>
    <div>
        <GoogleSignIn :client_id="client_id" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleSignIn>
        <GoogleSignIn :client_id="client_id" :logout=true class="button-style">Logout</GoogleSignIn>
        <button @click="handleClick">isLoggedIn</button>
    </div>
</template>

<script>
import { GoogleSignIn, isSignedIn } from '../src/';
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
        GoogleSignIn
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
            /* 
            // console.log(Vue.GoogleAuth.isSignedIn.get());
            const auth2 = await Vue.GoogleAuth;
            console.log(auth2.isSignedIn.get());
            
            */
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
