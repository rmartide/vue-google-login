let auth2;

const createScript = () => {
    return new Promise((resolve, reject) => {
        const el = document.getElementById('auth2_script_id');
        if (!el) {
            let gplatformScript = document.createElement('script')
            gplatformScript.setAttribute('src', 'https://apis.google.com/js/platform.js?onload=onGapiLoad')
            gplatformScript.setAttribute("async", true)
            gplatformScript.setAttribute("defer", "defer")
            gplatformScript.setAttribute("id", "auth2_script_id")
            document.head.appendChild(gplatformScript);
        }
        resolve();
    });

}

const createCallback = (client_id) => {
    return new Promise((resolve, reject) => {
        if (!window.onGapiLoad && client_id) {
            window.onGapiLoad = () => {
                window.gapi.load('auth2', () => {
                    auth2 = window.gapi.auth2.init({
                        client_id: client_id,
                    });
                    resolve(auth2);
                })
            }
        } else if (auth2) {
            resolve(auth2);
        }
    })
}

const load = (client_id) => {
    return Promise.all(
        [createCallback(client_id),
        createScript()]).then(results => {
            return results[0];
        });
}

const wrapper = (f, method, isProperty) => {
    if (f)
        return isProperty ? f[method] : f[method]();
    else {
        const err = { err: 'Script not loaded correctly, did you added the plugin or the client_id to the component?' };

        return isProperty ? { get: () => err } : Promise.reject(err);
    }
}

const signIn = () => wrapper(auth2, 'signIn');

const signOut = () => wrapper(auth2, 'signOut');

export const isSignedIn = () => wrapper(auth2, 'isSignedIn', true).get();

export default {
    load,
    signIn,
    signOut
}