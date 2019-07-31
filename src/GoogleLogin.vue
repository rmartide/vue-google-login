
<template>
		<div v-if="renderParams && !logoutButton" @click="handleClick" :id="id"></div>
		<button v-else @click="handleClick" :id="id">
			<slot></slot>
		</button>
</template>

<script>

let componentId = 0;
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
		},
		renderParams: {
			type: Object,
			required: false
		}
	},
	beforeCreate() {
		this.id = `google-signin-btn-${componentId++}`;
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
		GoogleAuth.load(this.params).then(() => {
			if (this.renderParams && this.logoutButton === false) {
				window.gapi.signin2.render(this.id, this.renderParams);
			}
		}).catch(err => {
			console.log(err);
		});
	}
}
</script>

<style>
</style>
