'use strict';

var path = require('path');
var API_NAME = path.basename(__filename, '.js');

module.exports = function(options) {

  var seneca = options.seneca;

  seneca.add({
    init: API_NAME
  }, function(args, done) {

    seneca.log.info(API_NAME,'init');

    /**
     * We are declaring to receive all paths '/dw/*'
     * and to forward it to the right action
     * according with the * parameter (called action)
     */

    options.server.route({
      method: ['GET'],
      path: ['/', API_NAME, '/{action?}'].join(''),

      handler: function(request, reply) {
        console.log('[ API-GW:', API_NAME, '] request:', request.params.action);
        // Reply using a Seneca action
        seneca.act({
          role: API_NAME,
          cmd: request.params.action,
          query: request.query,

          fatal$: false
        }, function(err, result) {
          if (err) {
            console.log('[ API-GW:', API_NAME, '] Error:', err);
            return reply(err);
          }
          return reply(result.message).code(result.statusCode || 200);
        });
      }
    });
    done();
  });

  return API_NAME;


};
