import express from "express"
import compression from "compression"
import bodyParser from "body-parser"
import hbs from 'hbs'
import path from "path"
import {getWithDefaults} from "./api/tutoring/data/catalog"

/**
 * This module constructs and Express App from our application controllers.
 * Solely responsible for the schema of our API.
 *
 * @param ctrls - A collection of all the HTTP controllers in our application
 */

export const expressApp = (ctrls) => {

    // Configuration
    const app = express()

    // Templating
    app.set("views", path.join(__dirname, "../views"))
    app.set("view engine", "hbs")
    hbs.registerPartials(path.join(__dirname, '../views/partials'))

    // Global Middleware
    app.use(compression())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    // Static Files
    app.use(express.static(path.join(__dirname, "public")))

    // REST API Endpoints
    app.post('/api/newsletter/subscribe', ctrls.newsletterCtrl.subscribe)
    app.post('/api/tutoring/request', ctrls.tutoringCtrl.submitTutoringRequest)
    app.post('/api/members/apply', ctrls.applicationsCtrl.submitApplication)

    // View Endpoints
    const render = (path) => (req, res) => res.render(path)
    app.get('/home', render('pages/home'))
    app.get('/become-a-member', render('pages/become-a-member'))
    app.get('/tutoring', (req, res) => res.render('pages/tutoring', getWithDefaults()))
    app.get('/resume-review', render('pages/resume_review'))
    app.get('/mock-interview', render('pages/mock_interview'))
    app.get('/member-login', render('pages/members/login'))
    app.get('/membership', render('pages/members/membership'))
    app.get('/purchase', render('pages/members/purchase'))
    app.get('/', (req, res) => res.redirect('/home'))

    return app
}
