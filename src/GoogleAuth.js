const createScript = () => {
    const el = document.getElementById('auth2_script_id');
    if (!el) {
        let gplatformScript = document.createElement('script')
        gplatformScript.setAttribute('src', 'https://apis.google.com/js/platform.js?onload=onGapiLoad')
        gplatformScript.setAttribute("async", true)
        gplatformScript.setAttribute("defer", "defer")
        gplatformScript.setAttribute("id", "auth2_script_id")
        document.head.appendChild(gplatformScript);
    }
}

const createCallback = (client_id) => {
    if (!window.onGapiLoad && client_id) {
        window.onGapiLoad = () => {
            window.gapi.load('auth2', () => {
                window.auth2 = window.gapi.auth2.init({
                    client_id: client_id,
                });
            })
        }
    }
}

const load = (client_id) => {
    createCallback(client_id);
    createScript();
}

const wrapper = (f, method) => {
    if (window.auth2)
        return f[method]();
    else
        return Promise.reject({ err: 'Script not loaded yet or not loaded correctly' })
}

const signIn = () => wrapper(window.auth2, 'signIn');

const signOut = () => wrapper(window.auth2, 'signOut');



export default {
    load,
    signIn,
    signOut
}