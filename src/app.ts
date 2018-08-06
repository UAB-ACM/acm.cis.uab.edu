import express from "express"
import compression from "compression"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import hbs from 'hbs'
import path from "path"
import {NewsletterModule} from "./api/newsletter/newsletter.module"

export const getApp = async () => {

    // Environment Variables
    dotenv.config({path: ".env"})

    // Configuration
    const app = express()
    app.set("port", process.env.PORT || 8080)

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

    // Modules
    let newsletter = NewsletterModule({ env: process.env })

    // API Endpoints
    let apiRouter = express.Router()
    apiRouter.get('/ping', (req, res) => res.send('pong'))
    apiRouter.use(newsletter.routes())

    app.use('/api', apiRouter)

    // View Routing
    app.use((req, res) => res.render('pages/coming_soon'))
    app.get('/home', (req, res) => res.render('pages/home'))
    app.get('/contact', (req, res) => res.render('pages/contact'))
    app.get('/member-login', (req, res) => res.render('pages/members/login'))
    app.get('/membership', (req, res) => res.render('pages/members/membership'))
    app.get('/purchase', (req, res) => res.render('pages/members/purchase'))
    app.get('/', (req, res) => res.redirect('/home'))

    return app
}
