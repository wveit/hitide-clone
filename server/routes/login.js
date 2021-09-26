import express from 'express';

const router = express.Router();

const clientId = process.env.EDL_CLIENT_ID;
const clientPassword = process.env.EDL_CLIENT_PASSWORD;
const credentials = base64Encode(`${clientId}:${clientPassword}`);
const baseUrl = process.env.EDL_BASE_URL;

router.get('/', (req, res) => {
    const redirectUri = req.query.redirect_uri;
    res.redirect(`${baseUrl}/oauth/authorize?redirect_uri=${redirectUri}&client_id=${clientId}&response_type=code`);
});

router.post('/', async (req, res) => {
    const requestMillis = Date.now();
    const { redirectUri, code } = req.body;
    const tokenResponse = await requestToken({
        baseUrl,
        credentials,
        redirectUri,
        code,
    });
    const userResponse = await requestUser({
        url: baseUrl + tokenResponse.endpoint,
        token: tokenResponse.access_token,
    });
    const user = {
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
        expires: requestMillis + Number(tokenResponse.expires_in),
        userEndpoint: tokenResponse.endpoint,
        uid: userResponse.uid,
        email: userResponse.email_address,
    };
    req.session.user = user;
    console.log(`logged in user ${user.uid}`);
    res.json({ uid: user.uid, email: user.email });
});

router.get('/me', async (req, res) => {});

function requestUser({ url, token }) {
    return fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());
}

function requestToken({ baseUrl, credentials, redirectUri, code }) {
    return fetch(`${baseUrl}/oauth/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodeObject({
            redirect_uri: redirectUri,
            code,
            grant_type: 'authorization_code',
        }),
    }).then((res) => res.json());
}

function base64Encode(string) {
    const buf = Buffer.from(string, 'utf-8');
    return buf.toString('base64');
}

function urlEncodeObject(obj) {
    return Object.keys(obj)
        .map((key) => `${key}=${obj[key]}`)
        .join('&');
}

export default router;
