'use strict';

exports.__esModule = true;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _expressDevice = require('express-device');

var _expressDevice2 = _interopRequireDefault(_expressDevice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  const env = app.get('env');

  app.use((0, _compression2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true, limit: '50mb' }));
  app.use(_bodyParser2.default.json({ limit: '50mb' }));
  app.use((0, _methodOverride2.default)());
  app.use((0, _cookieParser2.default)());
  app.use(_expressDevice2.default.capture({ parseUserAgent: true }));
  _expressDevice2.default.enableDeviceHelpers(app);

  if ('production' === env) {
    app.use((0, _serveFavicon2.default)(_path2.default.join(_config2.default.root, 'client/release', 'favicon.ico')));
    app.use(_express2.default.static(_path2.default.join(_config2.default.root, 'client/release')));
    app.set('appPath', `${_config2.default.root}/client/release`);
  }

  if ('development' === env || 'test' === env) {
    app.use(_express2.default.static(_path2.default.join(_config2.default.root, '.tmp')));
    app.use(_express2.default.static(_path2.default.join(_config2.default.root, process.env.DIST ? 'client/release' : `${__dirname}/../gen-tv-site/client`)));
    app.set('appPath', process.env.DIST ? 'client/release' : `${__dirname}/../gen-tv-site/client`);
  }
};