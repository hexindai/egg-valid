'use strict';

const should = require('should');
const Validation = require('../validation');
const validation = new Validation();

describe('Validation', function() {

  describe('#rules', function() {
    describe('required', function() {

      it('missing required field', function() {
        const rule = { int: 'required' };
        validation.validate({}, rule)[0].should.eql({
          code: 'missing_field',
          field: 'int',
          message: 'required',
        });
      });

      it('missing no-required field', function() {
        const rule = { int: 'alpha' };
        should.not.exist(validation.validate({}, rule));
      });

      it('pass value to no-required field', function() {
        const value = { int: '1abc' };
        const rule = { int: 'alpha' };
        validation.validate(value, rule)[0].should.eql({
          code: 'invalid',
          field: 'int',
          message: 'The field must be entirely alphabetic characters.',
        });
      });

      it('pass value to required rule and another rule', function() {
        const rule = { username: 'required|alpha' };
        const value = { username: 'runrioter' };
        should.not.exist(validation.validate(value, rule));
      });

      it('required rule can be put anywhere', function() {
        const rule = { username: 'alpha|required' };
        validation.validate({}, rule)[0].should.eql({
          code: 'missing_field',
          field: 'username',
          message: 'required',
        });
      });

      it('should throw type error when use unknown rule', function() {
        (function() {
          const rule = { username: 'required|alpha1' };
          const value = { username: 'runrioter' };
          validation.validate(value, rule);
        }).should.throw('Rule alpha1 is not builtin, check your type or you should add custom rule');
      });

      it('value should not be null, undefined, "", {}, []', function() {
        const value = {
          field1: null,
          field2: undefined,
          field3: '',
          field4: {},
          field5: [],
        };
        const rule = {
          field1: 'required',
          field2: 'required',
          field3: 'required',
          field4: 'required',
          field5: 'required',
        };
        validation.validate(value, rule).should.eql([
          {
            code: 'missing_field',
            field: 'field1',
            message: 'required',
          },
          {
            code: 'missing_field',
            field: 'field2',
            message: 'required',
          },
          {
            code: 'missing_field',
            field: 'field3',
            message: 'required',
          },
          {
            code: 'missing_field',
            field: 'field4',
            message: 'required',
          },
          {
            code: 'missing_field',
            field: 'field5',
            message: 'required',
          },
        ]);
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
        const rule = {
          password: 'required|password',
          password1: 'required|password',
        };
        const value = {
          password: '012345abcdef',
          password1: '&*;+$,?#[]%',
        };
        const messages = {
          'password.password': '密码格式错误',
          'password1.password': '密码格式错误',
        };
        should.not.exist(validation.validate(value, rule, messages));
      });
      it('should is not a valid password', function() {
        const rule = { password: 'required|password' };
        const value = { password: '&*;+$,?#\\[]1234567890' };
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

    describe('accepted', function() {
      it('should is a valid captcha', function() {
        const rule = { captcha: 'required|captcha' };
        const value = { captcha: '123456' };
        const messages = { 'captcha.captcha': '手机验证码错误' };
        should.not.exist(validation.validate(value, rule, messages));
      });
      it('should be "yes", "on", "1", 1, true, "true"', function() {
        const value = {
          field1: 'yes',
          field2: 'on',
          field3: 1,
          field4: '1',
          field5: 'true',
          field6: true,
        };
        const rule = {
          field1: 'accepted',
          field2: 'accepted',
          field3: 'accepted',
          field4: 'accepted',
          field5: 'accepted',
          field6: 'accepted',
        };
        should.not.exist(validation.validate(value, rule));
      });
    });

    describe('email', function() {
      it('should be a valid email', function() {
        const rule = { email: 'required|email' };
        const value = { email: 'runrioter@gmail.com' };
        const messages = { 'email.email': '邮箱格式错误' };
        should.not.exist(validation.validate(value, rule, messages));
      });
      it('should be not a valid email', function() {
        const rule = { email: 'required|email' };
        const value = { email: 'runriotergmail.com' };
        const messages = { 'email.email': '邮箱格式错误' };
        validation.validate(value, rule, messages)[0].should.eql({
          code: 'invalid',
          field: 'email',
          message: '邮箱格式错误',
        });
      });
    });

    describe('numeric', function() {
      it('should be a valid numeric string', function() {
        const rule = { numeric: 'required|numeric' };
        const value = { numeric: '0123456' };
        const messages = { 'numeric.numeric': 'should be numeric' };
        should.not.exist(validation.validate(value, rule, messages));
      });
      it('should be not a valid numeric', function() {
        const rule = { numeric: 'required|numeric' };
        const value = { numeric: '0122345o' };
        const messages = { 'numeric.numeric': 'should be numeric' };
        validation.validate(value, rule, messages)[0].should.eql({
          code: 'invalid',
          field: 'numeric',
          message: 'should be numeric',
        });
      });
      it('should be a valid numeric with length option', function() {
        const rule = { numeric: 'required|numeric:6' };
        const value = { numeric: '012345' };
        const messages = { 'numeric.numeric': 'should be numeric' };
        should.not.exist(validation.validate(value, rule, messages));
      });
      it('should be not a valid numeric with length option', function() {
        const rule = { numeric: 'required|numeric:6' };
        const value = { numeric: '01234a' };
        const messages = { 'numeric.numeric': 'numeric field should be a numeric with a length of 6' };
        validation.validate(value, rule, messages)[0].should.eql({
          code: 'invalid',
          field: 'numeric',
          message: 'numeric field should be a numeric with a length of 6',
        });
      });
    });

  });

  describe('#messages', function() {
    it('should work with custom plain messages', function() {
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
