import express from 'express';
const app = express();

app.get('/api/hello', (req, res) => {
    res.send('greetings');
});

export default async function handler(req, res) {
    app(req, res);
}
