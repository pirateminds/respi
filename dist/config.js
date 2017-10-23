'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

var all = {
  env: process.env.NODE_ENV,

  root: _path2.default.normalize(__dirname + '/../../..'),

  port: process.env.PORT || 9000,

  seedDB: false,

  secrets: {
    session: 'shhhhhhared-secret'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: (process.env.DOMAIN || '') + '/api/v2/auth/facebook/callback'
  },

  userRoles: ['guest', 'user', 'admin'],

  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }

};

module.exports = all;