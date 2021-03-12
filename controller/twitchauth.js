const axios = require('axios');
const express = require('express');
const config = require('config');

const redirect_uri = `${config.get("TWITCH_REDIRECT_URI")}/auth/twitch/callback`;

const authBaseUrl = 'https://id.twitch.tv/oauth2';
const authAPI = axios.create({
  baseURL: authBaseUrl
});

//"http://localhost:3000/_oauth/twitch?close"
//auth/twitch/callback
//const redirect_uri = `${config.get["TWITCH_REDIRECT_URI"]}/_oauth/twitch?close`;

const router = express.Router();

router.get('/', (req,res) => {
    const query = new URLSearchParams({
        client_id: config.get("TWITCH_CLIENT_ID"),
        redirect_uri,
        response_type: 'code',
        scope: req.query.scope,
        /* force_verify: false */
    })
    const redirectUrl = `${authBaseUrl}/authorize?${query}`;
    res.redirect(redirectUrl);
})

// Change the callback route here
router.get('/callback', async(req,res) => {
    const { code } = req.query;
    console.log(code)
    const query = new URLSearchParams({
        client_id: config.get("TWITCH_CLIENT_ID"),
        client_secret: config.get("TWITCH_CLIENT_SECRET"),
        code,
        grant_type: 'authorization_code',
        redirect_uri,
    });

    try {
        const {
            /* data : {access_token: token, refresh_token} */
            data : data
        } = await authAPI.post(`/token?${query}`);

        res.json({
           data
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
