'use strict';

var fs = require('fs');
var path = require('path');

/*
 * Seneca plugin to load actions
 * this plugins loads actions automatically from the actions directory
 */
module.exports = function(options) {

  var seneca = this;
  var SRV_NAME = options.name;
  var ACTS_PATH = path.join(__dirname, '/actions');

  // loading microservices actions
  fs.readdirSync(ACTS_PATH).forEach(function(file) {

    var f = path.basename(file, '.js');
    if (f !== file && f !== 'index') {
      console.log('[', SRV_NAME, ']', 'loading action', f);
      // add a seneca action
      var action = ['role:', SRV_NAME, ',cmd:', f].join('');
      seneca.add(action, require(path.join(ACTS_PATH, file)));
    }
  });

};
