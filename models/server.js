const express = require('express')
var cors = require('cors')
const colors = require('colors')
const { socketController } = require('../sockects/constroller')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)


        this.paths = {
            // auth: '/api/auth'
        }

        // Middleware
        this.middlewares()

        // configuraciones de rutas
        this.routes()

        //Sockects
        this.sockects()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth'))
    }

    sockects() {
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`.gray)
        })
    }
}


module.exports = Server







