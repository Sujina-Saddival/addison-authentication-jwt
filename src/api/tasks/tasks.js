'use strict';

const Handlers = require('./tasks-handlers.js');
const authorize = require('../../lib/authenticate');
const vaultGetKey = require('../vault/vault-handlers').vaultGetKey;
const routes = [];

exports.register = async function (server, options, next) {

  const validateUser = (decoded, request, callback) => {
    authorize.validateUser(request, callback);
  };

  const response = await vaultGetKey();
  const jwt_key = response.status === 200 ? response.data.data.JWT_PRIVATE_KEY : false;

  server.auth.strategy('jwt', 'jwt', 'required',
    {
      complete: true,
      key: jwt_key, // secret key
      validateFunc: validateUser, // validate function defined above
      verifyOptions: { algorithms: ['HS256'] }, // pick a strong algorithm
    });

  routes.forEach(route => server.route(route));
  next();
};


exports.register.attributes = require('./package');

routes.push({
  method: 'GET',
  path: '/api/tasks',
  config: {
    description: 'fetch',
    notes: 'Test Notes',
    tags: ['api'],
    security: {
      xframe: 'sameorigin',
    },
    cache: {
      otherwise: 'no-cache, no-store, must-revalidate',
    },
    handler: Handlers.getApiTasks,
    auth: {
      strategy: 'jwt',
    },
  },
});

