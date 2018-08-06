import express from 'express'
import {NewsletterController} from "./NewsletterController";

export const NewsletterModule = ({ env }) => {

    const mailgun = require('mailgun-js')({
        apiKey: env.MAILGUN_SECRET,
        domain: env.MAILGUN_DOMAIN
    })

    const ctrl = NewsletterController({ mailgun, newsletterList: 'newsletter@uabacm.com' })

    return {
        routes: () => {
            let router = express.Router()

            router.post('/newsletter/subscribe', ctrl.subscribe)

            return router
        }
    }
}