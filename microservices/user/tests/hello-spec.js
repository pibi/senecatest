'use strict';

var hello = require('../actions/hello');

describe('hello function', function() {

  it('should return salut = \'\' and tag = \'\'', function() {
    var args = {
      query: {
        salut: '',
        tag: ''
      }
    };
    hello(args, function(err, out) {
      expect(out.message.salut).toBe('');
      expect(out.message.tag).toBe('');
    });
  });

  it('should return salut = hello', function() {
    var args = {
      query: {
        salut: 'hello'
      }
    };
    hello(args, function(err, out) {
      expect(out.message.salut).toBe('hello');
    });
  });

  it('should return tag = javascript', function() {
    var args = {
      query: {
        salut: '',
        tag: 'javascript'
      }
    };
    hello(args, function(err, out) {
      expect(out.message.tag).toBe('javascript');
    });
  });

  it('should return salut = \'hello\' and tag = \'js\'', function() {
    var args = {
      query: {
        salut: 'hello',
        tag: 'js'
      }
    };
    hello(args, function(err, out) {
      expect(out.message.salut).toBe('hello');
      expect(out.message.tag).toBe('js');
    });
  });

});
