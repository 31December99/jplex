

export class Commands {

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
