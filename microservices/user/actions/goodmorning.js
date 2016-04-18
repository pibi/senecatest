'use strict';

module.exports = function(args, done) {

  var name = args.query.name;

  console.log('user/goodmorning?name=' + name);

  done(null, {
    message: {
      name: name,
      tag: args.tag
    }
  });

};
