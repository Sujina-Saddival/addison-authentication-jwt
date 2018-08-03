'use strict';

const Code = require('code');
const Lab = require('lab');
const addison = require('./lib/addison');

const lab = exports.lab = Lab.script();
const before = lab.before;

let server = null;


lab.experiment('Tests for post', () => {
  before(done => {
    addison.getServer()
      .then(addisonServer => {
        server = addisonServer;
        done();
      });
  });

  lab.test('Test for post method', done => {
    const options = {
      method: 'POST',
      url: '/api/signin',
    };

    server.inject(options, response => {
      Code.expect(response.payload).to.equal('Hello from post /api/signin');
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

