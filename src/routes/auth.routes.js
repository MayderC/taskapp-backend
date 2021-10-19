const express = require('express')
const router = express.Router()
const {authRegister, authLogin} = require('../controllers/auth/auth.controller')
const {options} = require('../helpers/option-cors')
const cors = require('cors')
const {check} = require('express-validator')
const {validate} = require('../middlewares/validateFields')

module.exports = () =>{

  router.post('/login',
  [ 
    cors(options),
    check('user', 'Se necesita el objeto user').not().isEmpty(),
    check('user.username', 'Se necesita el atributo username en el objeto user').not().isEmpty(),
    check('user.password', 'Se necesita el atributo username en el objeto user').not().isEmpty(),
    validate
  ],  
  authLogin)

  router.post('/register',
  [ 
    cors(options),
    check('user', 'Se necesita el objeto user').not().isEmpty(),
    check('user.username', 'Se necesita el atributo username en el objeto user').not().isEmpty(),
    check('user.password', 'Se necesita el atributo username en el objeto user').not().isEmpty(),
    validate
  ], 
  authRegister)

  return router
}