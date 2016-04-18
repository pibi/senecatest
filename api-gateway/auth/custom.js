'use strict';
var util = require('util');
var Boom = require('boom');

/**
 * The schema function should return at least
 * a property authenticate, containing the function will
 * be called for authentication
 */
function schema(server, options) {

  var seneca = options.seneca;

  return {
    authenticate: function(request, reply) {

      var req = request.raw.req;
      var authorization = req.headers.authorization || request.query.authorization;

      console.log('[ API-GW: AUTH] token: ', authorization);
      if (!authorization) {
        return reply(Boom.unauthorized(null, 'Custom'));
      }

      seneca.act({
        role: 'auth',
        cmd: 'token',
        query: { token: authorization },
        fatal$: false
      }, function(err, result) {
        if (err) {
          console.log('[ API-GW: AUTH] Error: ', err);
          return reply(err);
        }

        if ( result.auth.isValid ) {
          reply.continue({ credentials: result.credentials });
        } else {
          reply(Boom.unauthorized(null, 'Custom'));
        }
        return;
      });
      return;
    }
  };
}

module.exports = {
  schema: schema
};
