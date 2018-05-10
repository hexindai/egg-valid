'use strict';

const should = require('should');
const Validation = require('@killara/validation');
const validation = new Validation();

describe('Validation', function() {

  describe('#rules', function() {
    describe('required', function() {

      it('missing required field', async function() {
        const rule = { int: 'required' };
        const error = await validation.validate({}, rule);
        error.should.eql([{
          code: 'missing_field',
          field: 'int',
          message: 'The field is a must',
        }]);
      });

      it('missing no-required field', async function() {
        const rule = { int: 'alpha' };
        should.not.exist(await validation.validate({}, rule));
      });

      it('pass value to no-required field', async function() {
        const value = { int: '1abc' };
        const rule = { int: 'alpha' };
        const errors = await validation.validate(value, rule);
        errors.should.eql([{
          code: 'invalid',
          field: 'int',
          message: 'The field only contains letters.',
        }]);
      });

      it('pass value to required rule and another rule', async function() {
        const rule = { username: 'required|alpha' };
        const value = { username: 'runrioter' };
        should.not.exist(await validation.validate(value, rule));
      });

      it('required rule can be put anywhere', async function() {
        const rule = { username: 'alpha|required' };
        const errors = await validation.validate({}, rule);
        errors.should.eql([{
          code: 'missing_field',
          field: 'username',
          message: 'The field is a must',
        }]);
      });

      it('should throw type error when use unknown rule', function() {
        return new Promise((resolve, reject) => {
          const rule = { username: 'required|alpha1' };
          const value = { username: 'runrioter' };
          try {
            validation.validate(value, rule).then(resolve).catch(reject);
          } catch (e) {
            reject(e);
          }
        }).should.be.rejectedWith('Rule `alpha1` may be not a built-in rule, please add it.');
      });

      it('value should not be null, undefined, ""', async function() {
        const value = {
          field1: null,
          field2: undefined,
          field3: '',
        };
        const rule = {
          field1: 'required',
          field2: 'required',
          field3: 'required',
        };
        const errors = await validation.validate(value, rule);
        errors.should.eql([
          {
            code: 'missing_field',
            field: 'field1',
            message: 'The field is a must',
          },
          {
            code: 'missing_field',
            field: 'field2',
            message: 'The field is a must',
          },
          {
            code: 'missing_field',
            field: 'field3',
            message: 'The field is a must',
          },
        ]);
      });
    });

    describe('phone', function() {
      it('should is a valid phone number', async function() {
        const rule = { phone: 'required|phone' };
        const value = { phone: '15210001000' };
        const messages = { 'phone.phone': '该手机号不合法' };
        should.not.exist(await validation.validate(value, rule, messages));
      });
      it('should is not a valid phone number', async function() {
        const rule = { phone: 'required|phone' };
        const value = { phone: '25210001000' };
        const messages = { 'phone.phone': '该手机号不合法' };
        const errors = await validation.validate(value, rule, messages);
        errors.should.eql([{
          code: 'invalid',
          field: 'phone',
          message: '该手机号不合法',
        }]);
      });
    });

    describe('password', function() {
      it('should is a valid password', async function() {
        const rule = {
          password: 'required|password',
          password1: 'required|password',
          password2: 'required|password:"^[a-z0-9!()-._@#]{8,18}$"',
        };
        const value = {
          password: '012345abcdef',
          password1: '&*;+$,?#[]%',
          password2: '0a!()-._@#',
        };
        const messages = {
          'password.password': '密码格式错误',
          'password1.password': '密码格式错误',
        };
        should.not.exist(await validation.validate(value, rule, messages));
      });
      it('should is not a valid password', async function() {
        const rule = { password: 'required|password' };
        const value = { password: '&*;+$,?#\\[]1234567890' };
        const messages = { 'password.password': '密码长度有误' };
        const errors = await validation.validate(value, rule, messages);
        errors.should.eql([{
          code: 'invalid',
          field: 'password',
          message: '密码长度有误',
        }]);
      });
      it('should throw with wrong min, max', function() {
        return new Promise((resolve, reject) => {
          const rule = { password: 'required|password:min=18,max=8' };
          const value = { password: '&*;+$,?#[]1234567890' };
          const messages = { 'password.password': '密码长度有误' };
          try {
            validation.validate(value, rule, messages).then(resolve).catch(reject);
          } catch (e) {
            reject(e);
          }
        }).should.be.rejectedWith('min and max shoud be in the valid range');
      });
    });

    describe('captcha', function() {
      it('should is a valid captcha', async function() {
        const rule = { captcha: 'required|captcha' };
        const value = { captcha: '123456' };
        const messages = { 'captcha.captcha': '手机验证码错误' };
        should.not.exist(await validation.validate(value, rule, messages));
      });
      it('should is not a valid captcha', async function() {
        const rule = { captcha: 'required|captcha' };
        const value = { captcha: '12345i' };
        const messages = { 'captcha.captcha': '手机验证码错误' };
        const errors = await validation.validate(value, rule, messages);
        errors.should.eql([{
          code: 'invalid',
          field: 'captcha',
          message: '手机验证码错误',
        }]);
      });
      it('custom captcha length', async function() {
        const rule = { captcha: 'required|captcha:len=6' };
        const value = { captcha: '1234567' };
        const messages = { 'captcha.captcha': '手机验证码错误' };
        const errors = await validation.validate(value, rule, messages);
        errors.should.eql([{
          code: 'invalid',
          field: 'captcha',
          message: '手机验证码错误',
        }]);
      });
      it('any captcha length', async function() {
        const rule = { captcha: 'required|captcha:0' };
        const value = { captcha: '1234566' };
        const messages = { 'captcha.captcha': '手机验证码错误' };
        should.not.exist(await validation.validate(value, rule, messages));
      });
    });

    describe('accepted', function() {
      it('should is a valid captcha', async function() {
        const rule = { captcha: 'required|captcha' };
        const value = { captcha: '123456' };
        const messages = { 'captcha.captcha': '手机验证码错误' };
        should.not.exist(await validation.validate(value, rule, messages));
      });
      it('should be "yes", "on", "1", 1, true, "true"', async function() {
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
        should.not.exist(await validation.validate(value, rule));
      });
    });

    describe('email', function() {
      it('should be a valid email', async function() {
        const rule = { email: 'required|email' };
        const value = { email: 'runrioter@gmail.com' };
        const messages = { 'email.email': '邮箱格式错误' };
        should.not.exist(await validation.validate(value, rule, messages));
      });
      it('should be not a valid email', async function() {
        const rule = { email: 'required|email' };
        const value = { email: 'runriotergmail.com' };
        const messages = { 'email.email': '邮箱格式错误' };
        const errors = await validation.validate(value, rule, messages);
        errors.should.eql([{
          code: 'invalid',
          field: 'email',
          message: '邮箱格式错误',
        }]);
      });
    });

    describe('numeric', function() {
      it('should be a valid numeric string', async function() {
        const rule = { numeric: 'required|numeric' };
        const value = { numeric: '0123456' };
        const messages = { 'numeric.numeric': 'should be numeric' };
        should.not.exist(await validation.validate(value, rule, messages));
      });
      it('should be not a valid numeric', async function() {
        const rule = { numeric: 'required|numeric' };
        const value = { numeric: '0122345o' };
        const messages = { 'numeric.numeric': 'should be numeric' };
        const errors = await validation.validate(value, rule, messages);
        errors.should.eql([{
          code: 'invalid',
          field: 'numeric',
          message: 'should be numeric',
        }]);
      });
      it('should be a valid numeric with length option', async function() {
        const rule = { numeric: 'required|numeric:6' };
        const value = { numeric: '012345' };
        const messages = { 'numeric.numeric': 'should be numeric' };
        should.not.exist(await validation.validate(value, rule, messages));
      });
      it('should be not a valid numeric with length option', async function() {
        const rule = { numeric: 'required|numeric:6' };
        const value = { numeric: '01234a' };
        const messages = { 'numeric.numeric': 'numeric field should be a numeric with a length of 6' };
        const errors = await validation.validate(value, rule, messages);
        errors.should.eql([{
          code: 'invalid',
          field: 'numeric',
          message: 'numeric field should be a numeric with a length of 6',
        }]);
      });
    });

  });

  describe('#messages', function() {
    it('should work with custom plain messages', async function() {
      const rule = { username: 'required|alpha' };
      const value = { username: 'runrioter2' };
      const messages = { 'username.alpha': '该字段应该为字母串' };
      const errors = await validation.validate(value, rule, messages);
      errors.should.eql([{
        code: 'invalid',
        field: 'username',
        message: '该字段应该为字母串',
      }]);
    });
  });
});
