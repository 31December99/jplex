
import { Database } from './database.js';
import { TelegramBot } from './jplex.js';
import { Admin } from './plex.js';
import { config } from 'dotenv';

class Main {

    constructor() {

        // Trasferisco i parametri dal file env a process
        config();

        // Telegram Bot token
        this._botToken = process.env.BOT_TOKEN;

        // Plex server
        this._plexServer = process.env.SERVER;
        this._plexToken = process.env.PLEX_TOKEN;

        // MongoDB Atlas
        this._pswAtlas =  process.env.PSW_MONGOATLAS;
        this._userAtlas = process.env.USER_MONGOATLAS;

        console.log('Start...');
        this.start().then(() => {
            console.log('OK.');
        }).catch(error => {
            console.error('Failed:', error);
        });
    }

    async start() {
        try {

            // Plex istance
            this._plex = new Admin(this._botToken, this._plexServer);

            // Database istance
            this._db = new Database(this._userAtlas, this._pswAtlas)
            
            // Telegram bot istance
            this.tBot = new TelegramBot(this._botToken, this._plex, this._db)

            this.tBot.run();

        } catch (error) {
            console.error(`Error -> ${error}` );
            this.tBot.exit();
        }
    }
}


var main = new Main();


