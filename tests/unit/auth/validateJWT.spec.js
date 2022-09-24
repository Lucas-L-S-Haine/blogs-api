const fs = require('fs');
const { fail } = require('assert/strict');
require('dotenv/config');
const { sign } = require('jsonwebtoken');
const jwt = require('../../../src/auth/validateJWT');
const HTTPError = require('../../../src/utils/httpError');

const secret = process.env.JWT_SECRET;
const { jwtConfig } = require('../../../src/auth');

describe('Test json web token authentication middleware', () => {
  describe('validateToken', () => {
    it('should work for valid authorization token', () => {
      const user = {
        id: 2,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      };
      const validToken = sign(user, secret, jwtConfig);

      const req = { headers: { authorization: validToken } };
      const res = {};
      const next = function() {};

      const validateToken = () => jwt.validateToken(req, res, next);

      expect(validateToken).not.toThrow();
    });

    it('should throw error when authorization token expires', () => {
      const expiredToken = fs.readFileSync('tests/mocks/expiredToken.txt', { encoding: 'utf-8' });

      const req = { headers: { authorization: expiredToken } };
      const res = {};
      const next = function() {};

      try {
        jwt.validateToken(req, res, next);
        fail('function did not throw exception');
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('message', 'Expired or invalid token');
        expect(error).toHaveProperty('status', 401);
      }
    });

    it('should throw error when no token is found', () => {
      const token = null;

      const req = { headers: { authorization: token } };
      const res = {};
      const next = function() {};

      try {
        jwt.validateToken(req, res, next);
        fail('function did not throw exception');
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('message', 'Token not found');
        expect(error).toHaveProperty('status', 401);
      }
    });
  });
});
