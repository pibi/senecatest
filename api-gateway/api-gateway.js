'use strict';

var Hapi = require('hapi');
var Seneca = require('seneca');

var APP_PORT = process.env.APP_PORT || 3000;
var APP_HOST = process.env.APP_HOST || '0.0.0.0';
var QUEUE_HOST = process.env.QUEUE_HOST;

var server = new Hapi.Server();

server.connection({
  host: APP_HOST,
  port: APP_PORT
});

var seneca = new Seneca();

var options = {
  server: server,
  seneca: seneca,
  QUEUE_HOST: QUEUE_HOST
};

seneca
  // transport
  .use('beanstalk-transport')
  .client({
    type: 'beanstalk',
    pin: ['role:*,cmd:*'].join(''),
    host: options.QUEUE_HOST || '0.0.0.0'
  })
  // authentication/authorization modules
  .use('./auth/index.js', options)

  // API groups
  .use('./api/index.js',options);

seneca.ready(function() {

  seneca.log.info('ready to start');

  server.start(function(exc) {
    if (exc) {
      throw exc;
    }
    console.log('Server running at:', server.info.uri);
  });

});

