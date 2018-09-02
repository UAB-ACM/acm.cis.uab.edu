import {TutoringTicket} from "./TutoringTicket"
import {Trello} from "../core/trello/Trello"

export const pushTutoringTicketToTrello = (trello: Trello) => (list) => (ticket: TutoringTicket) => {
    trello.addCard(list)({
        desc: '```json' + JSON.stringify(ticket, null, 2) + '```',
        name: `${ticket.blazer_id} needs help with ${ticket.topic}`,
        pos: 'top',
        due: null,
        idList: list
    })
}