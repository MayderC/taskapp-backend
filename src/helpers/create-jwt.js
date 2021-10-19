const jwt = require('jsonwebtoken');



const createToken = (uid = '')=>{
  const KEYWORD = process.env.SECRET_KEY_JWT

  const payload = {
    uid : uid
  }

    return new Promise((resolve, reject) =>{           
      jwt.sign(payload, KEYWORD,{expiresIn : "7h"}, function(err, token) {
        if(err){
          reject(err)
        }else{
          resolve(token)
        }
      });
    })
  }

  
module.exports = {
  createToken
}