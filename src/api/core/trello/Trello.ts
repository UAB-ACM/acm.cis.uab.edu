const axios = require('axios')

export interface Trello {
    addCard: (list: string) => (card: any) => any
}

export interface TrelloCard {
    name: string
    desc: string
    pos: string
    due: string
}

export const Trello = ({key, token}): Trello => {

    // Sets base URL and adds creds to every request
    const conn = axios.create({
        baseURL: 'https://api.trello.com/1'
    })

    conn.interceptors.request.use((config) => {
        config.data.key = key
        config.data.token = token
        return config
    }, error => Promise.reject(error));

    const addCard = (list: string) => (card: TrelloCard) => conn.post('/cards', {idList: list, ...card})

    return {addCard}
}