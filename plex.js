
import {} from 'axios';

export class Admin {

    constructor(plex_token, server) {

        this._plex_token = plex_token
        this._server = server
        this.endpoint = '';

        const config = {
            headers: {
                'X-Plex-Token': this._plex_token,

            }
        };
    }
}