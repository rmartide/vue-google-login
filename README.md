# vue-google-login
Button to login with google with really simple setup


## UNDER CONSTRUCTION (close to being finished)

## INSTALLATION

To use the signin and and signout buttons there is no installation needed, just import and use.

If you want to have access to the auth api then you need add the plugin.


## Props

```js
    // The app's client ID, found and created in the Google Developers Console.
    client_id: String
    // It gets called if the action (signin/signout) is successful
    onSuccess: Function
    // It gets called if the action (signin/signout) fails
    onFailure: Function,
    // It determines if the button is for signing in or for signing out.
    // By default is false so you only need to add it for the sign out button
    signOut: Boolean
}
```

## Usage

```js
    import { GoogleSignIn } from 'vue-google-login';

    // Button to signIn
    <GoogleSignIn :client_id="client_id" :onSuccess="onSuccess" :onFailure="onFailure">Sign in</GoogleSignIn>

    // Button to signOut
    <GoogleSignIn :client_id="client_id" :signOut=true>Sign out</GoogleSignIn>
    
```

There is no need to add callbacks to the sign out button since the api doesn't return anything, you 
can do it nonetheless to make sure it worked.

When the user successfully signs in the callback will return an object that contains a lot of information
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

First import the plugin

```js
    import { LoaderPlugin } from 'vue-google-login';
```

Then add the plugin to the Vue instance with the client id

```js

    Vue.use(LoaderPlugin, {
        client_id: CLIENT_ID
    });
```

Then you will have access to the auth api.
It comes as a promise because the script takes a little bit to load.
This way we avoid having to worry about if the script has loaded yet or not.

```js
    Vue.GoogleAuth.then(auth2 => {
        console.log(auth2.isSignedIn.get());
    })
```
[Full auth api methods](https://developers.google.com/identity/sign-in/web/reference#authentication)