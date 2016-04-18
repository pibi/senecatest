'use strict';

var API_NAME = 'dw';

module.exports = function(options) {

  /**
   * We are declaring to receive all paths '/dw/*'
   * and to forward it to the right action
   * according with the * parameter (called action)
   */
  var seneca = this;

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

};
