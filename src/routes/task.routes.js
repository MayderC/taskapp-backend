const express = require('express')
const router = express.Router()
const {insertTask, deleteTask, getAllTask, editTask} = require('../controllers/task/task.controller')
const {verifyToken} = require('../middlewares/verify-jwt')
const {validate} = require('../middlewares/validateFields')
const {options} = require('../helpers/option-cors')
const cors = require('cors')
const {check} = require('express-validator')


module.exports = ()=>{

  router.get('/', 
  [
    cors(options),
    verifyToken,
  ], 
  getAllTask)


  router.post('/', 
  [
    cors(options),
    verifyToken,
    check('task', 'Se necesita el objeto task').not().isEmpty(),
    check('task.taskname', 'Se necesita el atributo taskname').not().isEmpty(),
    check('task.description', 'Se necesita el atributo description').not().isEmpty(),
    validate
  ], 
  insertTask)


  router.delete('/', 
  [
    cors(options),
    verifyToken,
    check('task', 'Se necesita el objeto task').not().isEmpty(),
    check('task.id', 'Se necesita el atributo id').not().isEmpty(),
    validate
  ], 
  deleteTask)


  router.put('/', 
  [
    cors(options),
    verifyToken,
    check('task', 'Se necesita el objeto task').not().isEmpty(),
    check('task.taskname', 'Se necesita el atributo taskname').not().isEmpty(),
    check('task.description', 'Se necesita el atributo description').not().isEmpty(),
    check('task.id', 'Se necesita el atributo id').not().isEmpty(),
    validate
  ], 
  editTask)
  

  return router
}