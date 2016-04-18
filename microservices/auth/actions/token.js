'use strict';

module.exports = function(args, done) {

  // object will be returned
  var response = {auth:{}, credentials:null};

  var john = {
    username: 'john',
    password: 'secret',
    name: 'John Doe',
    id: '2133d32a'
  };

  var token = args.query.token;

  if ( !token ) {
    response.auth.isValid = false;
  } else {
    response.auth.isValid = true;
    response.credentials= john
  }

  done(null, response);
};
