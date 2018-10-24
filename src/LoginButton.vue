<template>
    <button @click="signIn">Login</button>
</template>

<script>

import GoogleAuth from './../services/GoogleAuth.js';

export default {
  name: "LoginButton",
  props: {
    client_id: String,
    onSuccess: Function,
    onFailure: Function
  },
  methods: {
    signIn() {
      GoogleAuth.signIn().then(result => {
        return this.onSuccess(result);
      }).catch(err => {
        return this.onFailure(err);
      })
    }
  },
  mounted() {
    GoogleAuth.load(this.client_id);
  }
}
</script>

<style>
</style>
