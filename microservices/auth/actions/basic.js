'use strict';

var util = require('util');

/**
 * This is an example function used in
 * order to validate the architecture.
 * Indeed it simply look-up the array users and check
 * that exist a user having username and password
 * specified in querystring!!!!!
 */
module.exports = function(args, done) {
  // console.log('auth/basic?');

  // object will be returned
  var auth = {};

  var users = {
    john: {
      username: 'john',
      // password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
      // password used in clear for semplicity
      password: 'secret',
      name: 'John Doe',
      id: '2133d32a'
    }
  };

  // retrieve user and password from query string
  var username = args.query.username;
  var pwd = args.query.password;
  // console.log(username + ' - ' + pwd);

  var user = users[username];
  if ( !user ) {
    auth.isValid = false;
  } else if ( user.password === pwd ) {
    auth.isValid = true;
  } else {
    auth.isValid = false;
  }

  /** Return the object representing the
   * authentication result
   */
  done(null, {
    auth: auth
  });
};
