'use strict';

var API_NAME = 'user';

module.exports = function(options) {

  var seneca = this;

  /**
   * We are declaring to receive all paths '/user/*'
   * and to forward it to the right action
   * according with the * parameter (called action)
   */

  options.server.route({
    method: ['GET'],
    path: ['/', API_NAME, '/{action?}'].join(''),
    config: { auth: 'remote'}, // AUTH STRATEGY HERE
    handler: function(request, reply) {
      console.log('[ API-GW:', API_NAME, '] request:', request.params.action);
      // Reply using a Seneca action
      seneca.act({
        role: API_NAME,
        cmd: request.params.action,
        query: request.query,
        credentials: request.auth.isAuthenticated ? request.auth.credentials : false,
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

};
