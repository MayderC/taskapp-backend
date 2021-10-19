const {Server} = require('./server/index')
require('dotenv').config()


const TaskServer = new Server()
TaskServer.start()