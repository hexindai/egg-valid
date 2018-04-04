'use strict';

const should = require('should');
const Validation = require('../validation');
const validation = new Validation();

describe('Validation', function() {

  describe('#validate', function() {
    it('should receive a non-null object', function() {
      (function() {
        const rules = null;
        validation.validate({}, rules);
      }).should.throw('rules should be non-null object');
      (function() {
        const rules = () => {};
        validation.validate({}, rules);
      }).should.throw('rules should be non-null object');
    });
  });

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

  describe('phone', function() {
    it('should is a valid phone number', function() {
      const rule = { phone: 'required|phone' };
      const value = { phone: '15210001000' };
      const messages = { 'phone.phone': '该手机号不合法' };
      should.not.exist(validation.validate(value, rule, messages));
    });
    it('should is not a valid phone number', function() {
      const rule = { phone: 'required|phone' };
      const value = { phone: '25210001000' };
      const messages = { 'phone.phone': '该手机号不合法' };
      validation.validate(value, rule, messages)[0].should.eql({
        code: 'invalid',
        field: 'phone',
        message: '该手机号不合法',
      });
    });
  });

  describe('password', function() {
    it('should is a valid password', function() {
      const rule = { password: 'required|password' };
      const value = { password: '&*;+$,?#[]' };
      const messages = { 'password.password': '密码格式错误' };
      should.not.exist(validation.validate(value, rule, messages));
    });
    it('should is not a valid password', function() {
      const rule = { password: 'required|password' };
      const value = { password: '&*;+$,?#[]1234567890' };
      const messages = { 'password.password': '密码长度有误' };
      validation.validate(value, rule, messages)[0].should.eql({
        code: 'invalid',
        field: 'password',
        message: '密码长度有误',
      });
    });
  });

  describe('captcha', function() {
    it('should is a valid captcha', function() {
      const rule = { captcha: 'required|captcha' };
      const value = { captcha: '123456' };
      const messages = { 'captcha.captcha': '手机验证码错误' };
      should.not.exist(validation.validate(value, rule, messages));
    });
    it('should is not a valid captcha', function() {
      const rule = { captcha: 'required|captcha' };
      const value = { captcha: '12345i' };
      const messages = { 'captcha.captcha': '手机验证码错误' };
      validation.validate(value, rule, messages)[0].should.eql({
        code: 'invalid',
        field: 'captcha',
        message: '手机验证码错误',
      });
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
