const   {createToken}   = require('../../helpers/create-jwt')
const   User            = require('../../models/user')
const   bcrypt          = require('bcryptjs');


const authLogin = async(req, res)=>{

  const {username, password} = req.body.user

  //comparar contraseñas con bcripts
  //contraseña encriptada en la DB con la contraseña que ingreso el usuario 
  const result = await User.findOne({username})
  if(!result){return res.status(400).send({msg : "Error al inicar Sesión"})}

  
  const isvalid = bcrypt.compareSync(password, result.password)
  if(!isvalid){return res.status(400).send({msg : "Error al iniciar Sesión"})}
  // Crear jwt para usuario que ha iniciado session
  const token = await createToken(result._id.toString())  
  return res.send({token})
}


const authRegister = async(req, res) =>{
  // obtenemos los datos
  const {username, password} = req.body.user

  // Si existe un usuario con el mismo username, no  lo deje registarse, y retorne un badrequest
  const result = await User.findOne({username})
  if(result){return res.send({msg : `Ya existe un usuario con el nombre ${username}`, register: false})}

  // encriptar contraseña
  const salt = bcrypt.genSaltSync(10)
  var hash_pass = bcrypt.hashSync( password, salt);

  // creamos objeto a guardar en la base de datos
  const user = new User({username, password : hash_pass})


  // guardamos en la base de datos
  try {
    const save = await user.save()
    const uid = save._id.toString()
    // generar jwt para el nuevo usuario registrado. y loguearlo en el sistema
    const jwt = await createToken(uid)
    res.send({token : jwt})
  } catch (error) {console.log(error)}
}


module.exports = {
  authRegister,
  authLogin
}

