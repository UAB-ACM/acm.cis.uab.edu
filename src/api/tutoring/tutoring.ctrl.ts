import {makeTutoringTicket, TUTORING_TICKET, TutoringTicket} from "./TutoringTicket";

export const TutoringController = ({events}) => {
    return {
        submitTutoringRequest: (req, res, next) => {

            const { blazer_id, topic, message, email } = req.body

            // Emit the TUTORING_TICKET event with the newly created 'ticket' resource
            const ticket: TutoringTicket = makeTutoringTicket({ blazer_id, topic, message, email })
            events.emit(TUTORING_TICKET, ticket)

            return res.json({ msg: `Your tutoring ticket number is ${ticket.ID}. A confirmation has been sent to your inbox. We'll get back to you shortly to schedule your session!`})
        }
    }
}