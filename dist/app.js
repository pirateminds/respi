'use strict';

exports.__esModule = true;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _http = require('http');

var _express3 = require('./express');

var _express4 = _interopRequireDefault(_express3);

var _loadRoutes = require('./load-routes');

var _loadRoutes2 = _interopRequireDefault(_loadRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const app = (0, _express2.default)();
let server = (0, _http.createServer)(app);

(0, _express4.default)(app);
(0, _loadRoutes2.default)(app);

server.listen(_config2.default.port, _config2.default.ip, () => {
    console.log('Express server listening on %d, in %s mode', _config2.default.port, app.get('env'));
});

exports.default = app;