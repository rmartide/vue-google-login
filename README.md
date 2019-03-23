# vue-google-login
Button to login with google with really simple setup


## Installation

To use the login and logout buttons there is no installation needed, just import and use.

If you want to have access to the auth api then you need add the plugin.

## Update (Important, breaking change for those using it prior to 2.0.0)

In 2.0.0 there has been a change to allow you to add the full auth api configuration.

The only change it has to be done is instead of client_id the required prop is now params.

Params is an object whose properties set the configuration.

So if you don't want any aditional configuration only add the client_id property to params. 

Usage example updated down bellow.


## Props

```js
    // The Google Sign-In params configuration object. Required.
    params: Object
    // It gets called if the action (login/logout) is successful.
    onSuccess: Function
    // It gets called if the action (login/logout) fails.
    onFailure: Function,
    // It determines if the button is for logging in or for logging out.
    // By default is false so you only need to add it for the logout button
    logoutButton: Boolean

```

## Usage

```js
    // It can also be imported as { GoogleLogin }
    import GoogleLogin from 'vue-google-login';

    // Button to login
    <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>

    // Button to logout
    <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin>
    
    export default {
        name: 'App',
        data() {
            return {
                // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
                params: {
                    client_id: "xxxxxx"
                }
            }
        }
    }

```

There is no need to add callbacks to the logout button since the api doesn't return anything, you 
can do it nonetheless to make sure it worked.

When the user successfully signs in, the callback will return an object that contains a lot of information
about the user and about the access token granted.

```js
    onSuccess(googleUser) {
        console.log(googleUser);

        // This only gets the user information: id, name, imageUrl and email
        console.log(googleUser.getBasicProfile());
    }
```

## Styling the buttons

Even if it is a component you can think about it as a button, you can add classes, inline styles, etc...


## Auth api

This is completely optional. It's just to have access to the Auth api. It is not needed to use the buttons.

First import the plugin

```js
    import { LoaderPlugin } from 'vue-google-login';
```

Then add the plugin to the Vue instance with the params, client_id is the only property required but you can add some optional.

```js

    Vue.use(LoaderPlugin, {
        client_id: CLIENT_ID
    });
```

[Full list of params](https://developers.google.com/identity/sign-in/web/reference#gapiauth2clientconfig)

Then you will have access to the auth api.
It comes as a promise because the script doesn't load instantly.
This way we avoid having to worry about if the script has loaded yet or not.

```js
    Vue.GoogleAuth.then(auth2 => {
        console.log(auth2.isSignedIn.get());
    })
```
[Full auth api methods](https://developers.google.com/identity/sign-in/web/reference#authentication)
