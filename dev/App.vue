<template>
	<div>
		<!-- <GoogleLogin :params="params" :offline="true" :onSuccess="onSuccess" :onFailure="onFailure">Get offline token</GoogleLogin> -->
		<GoogleLogin
			:params="params"
			:renderParams="renderParams"
			:onCurrentUser="onCurrentUser"
			:onSuccess="onSuccess"
			:onFailure="onFailure"
			:logoutButton="false"
		>texto</GoogleLogin>
		<br />
		<GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>
		<GoogleLogin :params="params" :logoutButton="true" class="button-style">Logout</GoogleLogin>
		<button @click="handleClick">isLoggedIn</button>
	</div>
</template>

<script>
import GoogleLogin from "../dist/vue-google-login.min";
// import GoogleLogin from '../src/';
const CLIENT_ID = "672275288589-gdg4j010jalhp5n6gh45333dhuq69liv.apps.googleusercontent.com";
import Vue from 'vue';

export default {
	name: 'App',
	data() {
		return {
			params: {
				client_id: CLIENT_ID
			},
			renderParams: {
				width: 250,
				height: 50,
				longtitle: true
			}
		}
	},
	components: {
		GoogleLogin
	},
	methods: {
		onCurrentUser(googleUser) {
			console.log('onCurrentUser', googleUser);
		},
		onSuccess(googleUser) {
			console.log('googleUser', googleUser);
		},
		onFailure(err) {
			console.log(err)
		},
		handleClick() {
			Vue.GoogleAuth.then(auth2 => {
				console.log(auth2.isSignedIn.get());
			});

            /* Vue.GoogleAuth.then(auth2 => {
                console.log(auth2.isSignedIn.get());
                auth2.signOut().then(() => {
                    console.log(auth2.isSignedIn.get());
                })
            }); */
		}
	},
	mounted() {
		Vue.GoogleAuth.then(auth2 => {
            console.log(auth2.isSignedIn.get());
            console.log(auth2.currentUser.get())
		});
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
