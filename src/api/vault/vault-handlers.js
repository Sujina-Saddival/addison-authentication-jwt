'use strict';
const axios = require('axios');

function saveKey(request, reply) {
  axios.post('http://127.0.0.1:8200/v1/secret/jwt_private_key', { JWT_PRIVATE_KEY: request.payload.key },
    {
      headers: {
        'X-Vault-Token': process.env.vaultToken,
      }
    }
  )
    .then(function () {
      reply('Key has been saved in vault!');
    })
    .catch(function (error) {
      reply({ error, message: "Try again!" });
    });
}

async function getKey(request, reply) {
  const data = await vaultGetKey();
  reply({ data: data });
}

async function vaultGetKey() {
  return await axios.get('http://127.0.0.1:8200/v1/secret/jwt_private_key',
    {
      headers: {
        'X-Vault-Token': process.env.vaultToken,
      }
    }
  )
    .then(function (response) {
      return { data: response.data, status: 200 }
    })
    .catch(function (error) {
      return { error: error.response.data.errors, status: 503 }
    });
}

exports.saveKey = saveKey;
exports.getKey = getKey;
exports.vaultGetKey = vaultGetKey;

