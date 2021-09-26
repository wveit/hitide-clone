import { useState, useEffect } from 'react';

export function LoginControl() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const code = extractCode();
        console.log(code);
        if (!code) return;

        finishLogin(code, getRedirectUri()).then((user) => setUser(user));
    }, []);

    let userText = 'Login';
    if (user) {
        userText = user.uid;
    }

    function handleClick() {
        if (user) {
            // logout
            setUser(null);
        } else {
            // login (1st half)
            const redirectUri = getRedirectUri();
            window.location.href = `/api/login?redirect_uri=${redirectUri}`;
        }
    }

    return <button onClick={handleClick}>{userText}</button>;
}

function finishLogin(code, redirectUri) {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            redirectUri,
            code,
        }),
    }).then((res) => res.json());
}

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
