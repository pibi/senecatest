'use strict';

var QUEUE_HOST = process.env.QUEUE_HOST || '0.0.0.0';
var SRV_NAME = 'dw';

require('seneca')({
  strict: {
    result: false
  }
})
  .use('beanstalk-transport')
  .use('./plugin.js', {
    name: SRV_NAME
  })
  .listen({
    type: 'beanstalk',
    pin: ['role:', SRV_NAME, ',cmd:*'].join(''),
    host: QUEUE_HOST || '0.0.0.0'
  });
