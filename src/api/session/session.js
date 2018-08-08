'use strict';

const Joi = require('joi');
const Handlers = require('./session-handlers.js');
const routes = [];

exports.register = function (server, options, next) {
  routes.forEach(route => server.route(route));
  next();
};

exports.register.attributes = require('./package');

routes.push({
  method: 'POST',
  path: '/api/signin',
  config: {
    description: 'login using jwt',
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
        email: Joi.string(),
        password: Joi.string(),
      }),
    },
  },
  handler: Handlers.postApiSignin,
});

