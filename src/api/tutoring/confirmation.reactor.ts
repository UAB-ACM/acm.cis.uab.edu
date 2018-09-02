import {TutoringTicket} from "./TutoringTicket";
import {basicEmailTemplate} from "../core/emails/basic";

export const sendTutoringConfirmation = (mailgun) => (ticket: TutoringTicket) => {
    mailgun.messages().send({
        to: ticket.email,
        from: 'notifications@uabacm.com',
        subject: 'Tutoring Session Confirmation',
        html: basicEmailTemplate({
            header: `Hello ${ticket.blazer_id}! This email is confirming your request for a tutoring session. An ACM tutor with relevant experience should reach out to you soon.`,
            body: `<pre>${JSON.stringify(ticket, null, 2)}</pre>`,
            signature: 'ACM at UAB',
            disclaimer: ''
        })
    })
}