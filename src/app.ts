import express from "express"
import compression from "compression"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import hbs from 'hbs'
import path from "path"

export const getApp = async () => {

    // Environment Variables
    dotenv.config({ path: ".env" })

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
    app.use(bodyParser.urlencoded({ extended: true }))

    // Static Files
    app.use(express.static(path.join(__dirname, "public")))

    // Routes
    app.get('/ping', (req, res) => res.send('pong'))

    app.get('/home', (req, res) => res.render('pages/home'))
    app.get('/', (req, res) => res.redirect('/home'))

    return app
}
