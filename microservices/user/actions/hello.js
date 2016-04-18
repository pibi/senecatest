'use strict';

module.exports = function(args, done) {
  var log = this && this.log || console;

  var salut = args.query.salut;

  log.info('user/hello?salut=' + salut + '&tag=' + args.query.tag);

  done(null, {
    message: {
      salut: args.query.salut,
      tag: args.query.tag,
      credentials: args.credentials
    }
  });

};
