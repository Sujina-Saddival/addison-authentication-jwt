const jwt = require('jsonwebtoken');
const vaultGetKey = require("../api/vault/vault-handlers").vaultGetKey;
const authorize = {};

authorize.validateUser = async (request, callback) => {
  const response = await vaultGetKey();
  if (response.status === 200) {
    try {
      jwt.verify(request.headers.authorization, response.data.data.JWT_PRIVATE_KEY);
      return callback(null, true);
    } catch (error) {
      return callback(null, false);
    }
  } else {
    return callback(response.error, false);
  }
}

module.exports = authorize;
