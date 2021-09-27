import { doSetUser } from './userSlice';

export const doCheckForAuthCodeAndSession = () => async (dispatch, getState) => {
    console.log('checking code');
    const code = extractCode();
    if (!code) return dispatch(doCheckSession());

    console.log('have code');
    const redirectUri = getRedirectUri();

    const user = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            redirectUri,
            code,
        }),
    }).then((res) => res.json());

    dispatch(doSetUser(user));

    // TODO: make it so that we don't have to use a delay to remove the auth code from url
    setTimeout(removeCode, 2000);
};

export const doLogin = () => () => {
    const redirectUri = getRedirectUri();
    window.location.href = `/api/auth/login?redirect_uri=${redirectUri}`;
};

export const doLogout = () => async (dispatch) => {
    const user = await fetch('/api/auth/logout', {
        method: 'POST',
    }).then((res) => res.json());

    dispatch(doSetUser(user));
};

export const doCheckSession = () => async (dispatch) => {
    console.log('checking session');
    const user = await fetch('/api/auth/me').then((res) => res.json());
    dispatch(doSetUser(user));
};

function getRedirectUri() {
    const currentUrl = window.location.href;
    let nextUrl = currentUrl.split('?')[0];
    if (nextUrl.charAt(nextUrl.length - 1) !== '/') {
        nextUrl = nextUrl + '/';
    }
    return nextUrl;
}

function extractCode() {
    const match = window.location.href.match(/code=(.*)&?/);
    const code = match && match[1];
    return code;
}

function removeCode() {
    const match = window.location.href.match(/code=(.*)&?/);

    if (match) {
        let newUrl = window.location.href.replace(match[0], '');
        if (newUrl.charAt(newUrl.length - 1) === '?') {
            newUrl = newUrl.replace('?', '');
        }
        history.pushState({}, '', newUrl);
    }
}
