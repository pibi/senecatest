'use strict';

module.exports = function(args, done) {

  var user = args.query.user || 'unknown';

  console.log('dw/load', user);

  done(null, {
    message: JSON.stringify({
      user: user
    })
  });


};
