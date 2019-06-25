let auth2;
let loadingPromise;

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

const onGapiLoadPromise = (params) => {
    return new Promise((resolve, reject) => {
        window.onGapiLoad = () => {
            window.gapi.load('auth2', () => {
                try {
                    auth2 = window.gapi.auth2.init(
                        Object.assign({}, params)
                    );
                } catch (err) {
                    reject({ err: 'client_id missing or is incorrect, or if you added extra params maybe they are written incorrectly, did you add it to the component or plugin?' })
                }
                resolve(auth2);
            })
        }
    })
}

const loadingAuth2 = (params) => {
    if (auth2) {
        return Promise.resolve(auth2);
    } else {
        if (!loadingPromise)
            loadingPromise = onGapiLoadPromise(params);
        return loadingPromise;
    }
}

const load = (params) => {
    return Promise.all(
        [loadingAuth2(params), createScript()])
        .then(results => {
            return results[0];
        });
}

const wrapper = (f, method) => {
    if (f)
        return f[method]();
    else {
        const err = { err: 'Script not loaded correctly, did you added the plugin or the client_id to the component?' };
        return Promise.reject(err);
    }
}

const signIn = () => wrapper(auth2, 'signIn');

const signOut = () => wrapper(auth2, 'signOut');

export default {
    load,
    signIn,
    signOut
}
