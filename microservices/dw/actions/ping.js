'use strict';

module.exports = function(args, done) {

  console.log('dw/ping');

  done(null, {
    message: {
      pong: Date.now()
    }
  });

};
