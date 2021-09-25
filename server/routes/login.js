import express from 'express';

const router = express.Router();

const clientId = process.env.EDL_CLIENT_ID;
const clientPassword = process.env.EDL_CLIENT_PASSWORD;
const credentials = base64Encode(`${clientId}:${clientPassword}`);
const baseUrl = process.env.EDL_BASE_URL;

// http://localhost:3000/api/login?redirect_uri=http://localhost:3000/

router.get('/', (req, res) => {
    const redirectUri = req.query.redirect_uri;
    res.redirect(`${baseUrl}/oauth/authorize?redirect_uri=${redirectUri}&client_id=${clientId}&response_type=code`);
});

router.post('/', async (req, res) => {
    const { redirect_uri: redirectUri, code } = req.body;
    const response = await requestToken({
        baseUrl,
        credentials,
        redirectUri,
        code,
    });
    res.json(response);
});

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
