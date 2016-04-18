'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(options) {
  var seneca = options.seneca;

  // loading API definitions
  fs.readdirSync(path.join(__dirname, '/')).forEach(function(file) {
    var f = path.basename(file, '.js');
    if (f !== file && f !== 'index') {
      console.log('[ API-GW ]', 'loading ', f);
      seneca.use(path.join(__dirname, '/', file), options);
    }
  });

};
