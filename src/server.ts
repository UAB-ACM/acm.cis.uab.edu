import errorHandler from "errorhandler"
import {RootModule} from "./root.module"
import dotenv from "dotenv"
import {getConfig} from "./config"

/**
 * Main entry-point to the application.
 * This script is meant to be directly executed under a process manager.
 *
 * It loads the environment and initializes the root module, which exports the express app.
 * Lastly, it starts the HTTP server
 */

export const startServer = async () => {
    dotenv.config({path: ".env"})
    const config = getConfig(process.env)
    const {app} = await RootModule(config)

    app.use(errorHandler())

    app.on('uncaughtException', () => process.exit(1))

    const server = app.listen(config.port, () => {
        console.log(
            "  App is running at http://localhost:%d",
            config.port
        )
        console.log("  Press CTRL-C to stop\n")
    })

    return server
}

startServer()