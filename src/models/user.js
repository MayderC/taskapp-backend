const {Schema, model} = require('mongoose')

const userShema = new Schema({
  username : {
    type : String,
    require: [true, "Se requiere un username"],
    unique: true
  },

  password : {
    type : String,
    require : [true, "La constraseña es requerida"]
  }
})

module.exports = model('user', userShema)