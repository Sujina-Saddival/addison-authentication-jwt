const jwt = require('jsonwebtoken');
const authorize = {};

authorize.validateUser = (request, callback) => {
  try {
    jwt.verify(request.headers.authorization, '_HPE_JWT_SECRET_ABC_1234');
    return callback(null, true);
  } catch (error) {
    return callback(null, false);
  }
}

module.exports = authorize;
