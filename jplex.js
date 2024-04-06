// -*- coding: utf-8 -*-

const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const plex  = require('plex.js')


class Commands {

    constructor() {
        // Inline menù dopo aver trascritto il nome del bot 
        this.result = [
            {
                type: 'article',
                id: '1',
                title: 'Nuovo utente',
                input_message_content: {
                    message_text: '/register'
                }
            },
            {
                type: 'article',
                id: '2',
                title: 'Elenco users',
                input_message_content: {
                    message_text: '/users'
                }
            }
        ];
    }

}

class Bot {

    constructor() {
        /**
         * Bot rappresenta una classe che si occupa di gestire i comandi inline dell'utente
         * @param {telegraf} bot - Telegraf bot
         */

        // Trasferisco i parametri dal file env a process
        dotenv.config();

        // Bot token
        this._token = process.env.BOT_TOKEN

        // Istanzio nuovo bot
        this.bot = new Telegraf(this._token);
        console.log(`Welcome to firstBot ${this._token}`);

        // Callback per ottenere informazioni sull'utente
        // https://telegraf.js.org/index.html#md:telegraf-class
        // Dovrebbe ricevere dall'update/botinfo
        // Non è un gestore eventi ma un flusso middleware, niente stringa
        this.bot.use(this.userInfo.bind(this)); 

        // Bind del metodo: https://it.javascript.info/bind#soluzione-2-bind
        this.handleInlineQuery = this.handleInlineQuery.bind(this);
        // Callbac per  gestore per l'evento `inline_query`
        this.bot.on(`inline_query`, this.handleInlineQuery);

    }


    // Middleware 
    // Ctx = context istance
    // next() rappresenta la funzione del middlware successivo
    // questa funzione si inserisce tra l'updates ricevuto e il gestore di eventi 
    async userInfo(ctx,next) {
        console.log("MIDDLEWARE")
        console.log(`[${new Date().toISOString()}] userid: ${ctx.from.id}`);
        console.log(`[${new Date().toISOString()}] username: ${ctx.from.username}`);
        console.log(`[${new Date().toISOString()}] first_name: ${ctx.from.first_name} ${ctx.from.last_name}`);
        
        // prossimo middleware
        return next();
    }


    // Gestore eventi update di telegram
    // ctx è una istanza context che intercetta tutti gli updates e response di telegram e li passa al gestore eventi o al middleware
    async handleInlineQuery(ctx) {

        // Rappresenta il testo inserito dall'utente nell'inline query
        const query = ctx.inlineQuery.query;

        let plex = plex()



        // Istanzio una classe per le risposte alle query inline dell'utente
        this.commands = new Commands()

        // Invia la risposta inline
        await ctx.answerInlineQuery(this.commands.result);
    }

    // Avvio il bot
    run() {
        this.bot.launch();
    }

    exit() {

        // node.js intercetta ctr-c 
        process.once('SIGINT', () => this.bot.stop('SIGINT'))  
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'))
    }

}


bot = new Bot()
bot.run()
bot.exit()