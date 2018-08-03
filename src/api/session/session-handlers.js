'use strict';
const userData = require('../../data/users.json');
const jwt = require('jsonwebtoken');

function postApiSignin(request, reply) {
  const user = verifyUser(request.payload);
  if (user.length > 0) {
    try {
      const token = jwt.sign({ email: user[0].email, scope: user[0].scope }, '_HPE_JWT_SECRET_ABC_1234');
      reply({ token, message: 'Logged in succesfully' }).code(200);
    } catch (error) {
      reply(error).code(404);
    }
  } else {
    reply('Invalid cerdentials!!').code(404)
  }
}

function verifyUser(request) {
  function filterByUserData(user) {
    if (user.email === request.email && user.password === request.password) {
      return user;
    }
  }
  return userData.filter(filterByUserData);
}

exports.postApiSignin = postApiSignin;

