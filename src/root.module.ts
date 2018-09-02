import {TutoringController} from "./api/tutoring/tutoring.ctrl"
import {NewsletterController} from "./api/newsletter/newsletter.ctrl"
import {sendTutoringNotification} from "./api/tutoring/acm-notify.reactor"
import {NewsletterService} from "./api/newsletter/newsletter.service"
import {expressApp} from "./expressApp"
import {TUTORING_TICKET} from "./api/tutoring/TutoringTicket"
import EventEmitter = require('events')
import {sendTutoringConfirmation} from "./api/tutoring/confirmation.reactor"
import {pushTutoringTicketToTrello} from "./api/tutoring/trello.reactor"
import {ApplicationsService} from "./api/applications/applications.service"
import {ApplicationsController} from "./api/applications/applications.ctrl"
import {Trello} from "./api/core/trello/Trello"
import {APPLICATION_CREATED} from "./api/applications/Application";
import {pushApplicationToTrello} from "./api/applications/reactors/trello";

/**
 * The root module of our application.
 * AKA composition root.
 *
 * Initializes all other modules, both external and local.
 *
 * Exports the express application (REST API)
 *
 * @param config - the global application configuration (mostly loaded from environment)
 */

export const RootModule = async (config) => {

    // Event Bus
    const events = new EventEmitter()

    // External Modules
    const mailgun = require('mailgun-js')(config.mailgun.creds)
    const trello = Trello(config.trello.creds)

    // Local Modules/Services
    const newsletterService = NewsletterService(mailgun)

    // Controllers
    const applicationsCtrl = ApplicationsController(events)(ApplicationsService)
    const tutoringCtrl = TutoringController({events})
    const newsletterCtrl = NewsletterController({newsletterService, list: config.mailgun.newsletter})

    // Event binding to reactors
    events.on(TUTORING_TICKET, sendTutoringNotification(mailgun)(config.tutoring.notifyEmail))
    events.on(TUTORING_TICKET, pushTutoringTicketToTrello(trello)(config.trello.lists.tutoring))
    events.on(TUTORING_TICKET, sendTutoringConfirmation(mailgun))
    events.on(APPLICATION_CREATED, pushApplicationToTrello(trello)(config.trello.lists.applications))

    // Module Exports
    return {
        app: expressApp({
            newsletterCtrl,
            tutoringCtrl,
            applicationsCtrl
        })
    }
}
