const Task = require('../../models/task')


const insertTask = (req, res)=>{

  const {taskname, description} = req.body.task

  const tasks = new Task({taskname, description, user: req.uid})

  try {
    tasks.save()
    return res.send({taskname, description, inserted : true})
  } catch (error) {
    console.log(error)
  }
}

const getAllTask = async(req, res) =>{

  const uid = req.uid

  const tasks = await Task.find({user: uid})

  if(!tasks){
    return res.send({msg : "Aun no tienes Tareas guardadas"})
  }

  res.send({tasks})
}


const editTask = async(req, res)=>{


  const {id, taskname, description} =  req.body.task



  const result = await Task.findByIdAndUpdate( id, {taskname, description})
  if(!result){
    return res.status(400).send({msg : "Error no se encontro elemento a editar"})
  }


  const taskUpdated = {
    id : result._id.toString(),
    taskname :result.taskname,
    description: result.description
  }
  res.send({taskUpdated})
}


const deleteTask = async(req, res)=>{

  const {id} = req.body.task


  const result = await Task.findByIdAndRemove(id)
  if(!result){
   return res.status(400).send({msg : "No se encontro elemento a eliminar"})
  }


  const taskDeleted = {taskname : result.taskname}
  res.send(taskDeleted)

}

module.exports = {
  insertTask,
  deleteTask,
  getAllTask,
  editTask
}

