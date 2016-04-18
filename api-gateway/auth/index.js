'use strict';

var Custom = require('./custom.js');

var SRV_NAME = 'auth';

module.exports = function(options) {

  var server = options.server;

  server.auth.scheme('custom', Custom.schema);
  server.auth.strategy('remote', 'custom', options);

};

