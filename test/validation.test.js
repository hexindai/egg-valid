'use strict';

const should = require('should');
const Validation = require('../validation');
const validation = new Validation();

describe('Validation', function() {
  describe('required', function() {
    it('should required work fine', function() {
      const rule = { int: 'required' };
      validation.validate({}, rule)[0].should.eql({
        code: 'missing_field',
        field: 'int',
        message: 'required',
      });
    });

    it('should not required work fine', function() {
      const rule = { int: 'alpha' };
      should.not.exist(validation.validate({}, rule));
    });

    it('should not required check ok', function() {
      const value = { int: '1abc' };
      const rule = { int: 'alpha' };
      validation.validate(value, rule)[0].should.eql({
        code: 'invalid',
        field: 'int',
        message: 'The field must be entirely alphabetic characters.',
      });
    });

    it('should both required and alpha work fine', function() {
      const rule = { username: 'required|alpha' };
      const value = { username: 'runrioter' };
      should.not.exist(validation.validate(value, rule));
    });

    it('should both required and alpha work fine when required is put on the final', function() {
      const rule = { username: 'alpha|required' };
      validation.validate({}, rule)[0].should.eql({
        code: 'missing_field',
        field: 'username',
        message: 'required',
      });
    });

    it('should throw type error', function() {
      (function() {
        const rule = { username: 'required|alpha1' };
        const value = { username: 'runrioter' };
        validation.validate(value, rule);
      }).should.throw('Rule alpha1 is not builtin, check your type or you should add custom rule');
    });
  });
  describe('custom messages', function() {
    it('should work with custom plain message', function() {
      const rule = { username: 'required|alpha' };
      const value = { username: 'runrioter2' };
      const messages = { 'username.alpha': '该字段应该为字母串' };
      validation.validate(value, rule, messages)[0].should.eql({
        code: 'invalid',
        field: 'username',
        message: '该字段应该为字母串',
      });
    });
  });
});
