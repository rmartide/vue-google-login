# vue-google-login
Button to login with google with really simple setup


## Installation

To use the login and logout buttons there is no installation needed, just import and use.

If you want to have access to the auth api then you need add the plugin.

## 2.0.5 update

Added callback to get the current user without adding the plugin (Thanks rmoscuba)

## 2.0.1 update

Added support to Edge (Thanks Magyarb)

Added option to render a sign-in button with google UI (Thanks TheTrueRandom)

## 2.0.0 update

Added support for the full auth api configuration.

## Props

```js
    // The Google Sign-In params configuration object. Required.
    // https://developers.google.com/identity/sign-in/web/reference#gapiauth2clientconfig    
    params: Object
    // It gets called if the action (login/logout) is successful.
    onSuccess: Function
    // It gets called if the action (login/logout) fails.
    onFailure: Function
    // It determines if the button is for logging in or for logging out.
    // By default is false so you only need to add it for the logout button
    logoutButton: Boolean
    // Optional, if provided will call gapi.signin2.render with the provided params and render a button with google UI
    // https://developers.google.com/identity/sign-in/web/reference#gapisignin2renderid-options
    renderParams: Object
    // If you are logged in it will return the current user when the component mounts
    // The object it's the same as onSuccess
    onCurrentUser: Function

```

## Usage

```js
    // It can also be imported as { GoogleLogin }
    import GoogleLogin from 'vue-google-login';

    // Button to login
    <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>
```

![alt text](https://raw.githubusercontent.com/rmartide/vue-google-login/master/images/normal.png)

```js
    // Button to login with google ui rendered using the renderParams object
    // The rendered button can't be use to logout since it is rendered by the google api and will only login
    // If you add the logoutButton param to true it will show a normal button without styles
    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
```

![alt text](https://raw.githubusercontent.com/rmartide/vue-google-login/master/images/ui.png)

```js
    // Button to logout
    <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin>
```

```js
    export default {
        name: 'App',
        data() {
            return {
                // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
                params: {
                    client_id: "xxxxxx"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
            }
        },
        components: {
            GoogleLogin
        }
    }

```

There is no need to add callbacks to the logout button since the api doesn't return anything, you 
can do it nonetheless to make sure it worked.

When the user successfully signs in, the callback will return an object that contains a lot of information
about the user and about the access token granted.

```js
    methods: {
        onSuccess(googleUser) {
            console.log(googleUser);

            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
        }
    }
```

## Styling the buttons

Even if it is a component you can think about it as a button, you can add classes, inline styles, etc...

Without renderParams is a button, with renderParams is a div since google injects the button so take it into account when adding styles to the component.


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
        console.log(auth2.currentUser.get())
    })
```
[Full auth api methods](https://developers.google.com/identity/sign-in/web/reference#authentication)
