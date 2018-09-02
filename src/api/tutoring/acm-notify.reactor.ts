import {TutoringTicket} from "./TutoringTicket"
import {basicEmailTemplate} from "../core/emails/basic"

export const sendTutoringNotification = (mailgun) => (toEmail) => (ticket: TutoringTicket) =>

    mailgun.messages().send({
        from: 'notifications@uabacm.com',
        to: toEmail,
        subject: 'Tutoring Request',
        html: basicEmailTemplate({
            header: 'New tutoring request from ' + ticket.blazer_id,
            body: `<pre>${JSON.stringify(ticket)}</pre>`,
            signature: 'ACM Notifications',
            disclaimer: 'ACM at UAB'
        })
    })