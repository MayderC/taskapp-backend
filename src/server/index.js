const express = require('express')
const task = require('../routes/task.routes')
const {conection} = require('../database')
const auth = require('../routes/auth.routes')
const cors = require('cors')


class Server{
  constructor(){
    this.app = express()
    this.port = process.env.PORT
    
    //Metodos
    this.middlewares()
    this.routes()
    this.conexion()
  }
  middlewares(){
    this.app.use(express.json())
    this.app.use(cors())
  }
  
  conexion(){
    conection()
  }
  routes(){
    this.app.use('/api/task', task())
    this.app.use('/api/auth', auth())
  }
  start(){
    this.app.listen(this.port, ()=>{
      console.log("Servidor Online", this.port)
    })
  }
}
module.exports = {
  Server
}