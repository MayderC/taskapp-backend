const jwt = require('jsonwebtoken');

const decodeToken = (token = '') =>{
  const KEYWORD = process.env.SECRET_KEY_JWT

  try {
    return jwt.verify(token, KEYWORD);
  } catch (error) {return false}


}


module.exports = {
  decodeToken
}
