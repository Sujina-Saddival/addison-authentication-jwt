'use strict';

const Joi = require('joi');
const Handlers = require('./vault-handlers.js');
const routes = [];

exports.register = function (server, options, next) {
  routes.forEach(route => server.route(route));
  next();
};

exports.register.attributes = require('./package');

routes.push({
  method: 'POST',
  path: '/api/saveKey',
  config: {
    description: 'To store private key in vault',
    notes: 'Test Notes',
    tags: ['api'],
    auth: false,
    security: {
      xframe: 'sameorigin',
    },
    cache: {
      otherwise: 'no-cache, no-store, must-revalidate',
    },
    validate: {
      payload: Joi.object({
        key: Joi.string().required(),
      }),
    },
  },
  handler: Handlers.saveKey,
});

routes.push({
  method: 'GET',
  path: '/api/key',
  config: {
    description: 'To get private key which is stroed in vault',
    notes: 'Test Notes',
    tags: ['api'],
    auth: false,
    security: {
      xframe: 'sameorigin',
    },
    cache: {
      otherwise: 'no-cache, no-store, must-revalidate',
    },
  },
  handler: Handlers.getKey,
});

