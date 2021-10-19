const {decodeToken} = require('../helpers/decode-jwt')

const verifyToken = (req, res, next)=>{

  const token = req.header('x-token')


  if(!token){
    return res.status(400).send({msg : "Error no se encontro el header"})
  }

  const {uid} = decodeToken(token)
  if(uid){
    
    req.uid = uid
    next()

  }else{
    return res.send({token : false})
  }
}

module.exports =  {
  verifyToken
}