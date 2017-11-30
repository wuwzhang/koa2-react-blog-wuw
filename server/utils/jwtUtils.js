const jwt = require('jsonwebtoken');

function setToken(data, secretKey) {
  var token = jwt.sign({
    data: data,
  }, secretKey, { expiresIn: '1h' });

  return token;
}

function getToken(token, secretKey) {
  return jwt.verify(token, secretKey, function(err, decoded) {
    if (err) {
      return -1;
    } else {

      //未过期将token进行解析，返回用户账号
      return decoded.data;
    }
  })
}

module.exports = {
  setToken,
  getToken
}
