
const { Schema, model } = require('mongoose');


const taskShema =  new Schema({

  user: {
    type: String,
    require : [true, "El usuario es requerido"]
  },

  taskname : {
    type : String,
    require : ["El  nombre es requerido", true]
  },

  description : {
    type : String,
    require : ["La descripcion es requerida", true]
  },

})


taskShema.methods.toJSON = function(){
  const {__v, _id, user, ...tasks} = this.toObject()
  tasks.id = _id
  return tasks
}

module.exports = model('task', taskShema)