import express from 'express'
import {NewsletterController} from "./newsletter.ctrl"

export const NewsletterModule = ({ env }) => {

    // Init the MailGun SDK
    const mailgun = require('mailgun-js')({
        apiKey: env.MAILGUN_SECRET,
        domain: env.MAILGUN_DOMAIN
    })

    // Init controller(s)
    const ctrl = NewsletterController({ mailgun, newsletterList: env.MAILGUN_NEWSLETTER })

    // Return the module object
    return {
        routes: () => {
            let router = express.Router()
            router.post('/newsletter/subscribe', ctrl.subscribe)
            return router
        }
    }
}
