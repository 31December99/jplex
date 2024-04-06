
const axios = require('axios');
const dotenv = require('dotenv');

class Admin {

    constructor() {

        dotenv.config();
        this._plex_token = process.env.BOT_TOKEN;
        this._server = process.env.SERVER;
        this.endpoint = '';

        const config = {
            headers: {
                'X-Plex-Token': this._plex_token,

            }
        };
    }
}