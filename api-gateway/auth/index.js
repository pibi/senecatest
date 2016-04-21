'use strict';

var Custom = require('./custom.js');

module.exports = function(options) {

  var server = options.server;
  var seneca = this;

  seneca.add({
    init: 'auth'
  }, function(args, done) {
    done();
  });

  server.auth.scheme('custom', Custom.schema);
  server.auth.strategy('remote', 'custom', options);
  server.auth.strategy('api_key', 'custom', options);

  return('auth');

};

