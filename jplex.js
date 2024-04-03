// -*- coding: utf-8 -*-

const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');


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
                title: '/Elenco users',
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
         * @param {const} bot - Telegraf bot
         */

        // Trasferisco i parametri dal file env a process
        dotenv.config();

        // Bot token
        this._token = process.env.BOT_TOKEN

        // Istanzio nuovo bot
        this.bot = new Telegraf(this._token);
        console.log(`Welcome to firstBot ${this._token}`);

        // Bind del metodo: https://it.javascript.info/bind#soluzione-2-bind
        this.handleInlineQuery = this.handleInlineQuery.bind(this);

        // Registra il gestore per l'evento inline_query
        this.bot.on(`inline_query`, this.handleInlineQuery);
    }


    // Gestore eventi update di telegram
    async handleInlineQuery(ctx) {

        // Rappresenta il testo inserito dall'utente nell'inline query ( sulla stessa riga del nome del bot...)
        const query = ctx.inlineQuery.query;

        // Istanzio una classe per le risposte alle query inline dell'utente
        this.commands = new Commands()

        // Invia la risposta inline
        await ctx.answerInlineQuery(this.commands.result);
    }

    // Avvio il bot
    run() {
        this.bot.launch();
    }

}


bot = new Bot()
bot.run()
// Enable graceful stop
https://telegraf.js.org/index.html#md:shorthand-methods

// node.js intercetta ctr-c 
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

