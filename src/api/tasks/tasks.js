'use strict';

const Handlers = require('./tasks-handlers.js');
const authorize = require('../../lib/authenticate');
const routes = [];

exports.register = function (server, options, next) {

  const validateUser = (decoded, request, callback) => {
    authorize.validateUser(request, callback);
  };

  server.auth.strategy('jwt', 'jwt', 'required',
    {
      complete: true,
      key: '_HPE_JWT_SECRET_ABC_1234', // secret key
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

routes.push({
  method: 'GET',
  path: '/api/allTasks',
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
    handler: Handlers.getAllApiTasks,
    auth: false,
  },
});
