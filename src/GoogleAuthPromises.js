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
                    window.auth2 = window.gapi.auth2.init({
                        client_id: client_id,
                    });
                    resolve(window.auth2);
                })
            }
        } else if (window.auth2) {
            resolve(window.auth2);
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
    else
        return Promise.reject({ err: 'Script not loaded yet or not loaded correctly' })
}

const signIn = () => wrapper(window.auth2, 'signIn');

const signOut = () => wrapper(window.auth2, 'signOut');

export const isSignedIn = () => wrapper(window.auth2, 'isSignedIn', true).get();
export const getAuth2 = () => window.auth2;

export default {
    load,
    signIn,
    signOut
}