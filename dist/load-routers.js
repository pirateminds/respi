'use strict';

exports.__esModule = true;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
    let defaultActionsFolder = _path2.default.resolve(process.cwd(), './actions');
    let actions = _fs2.default.readdirSync(defaultActionsFolder).filter(e => e.endsWith('.js'));

    console.log('actions', actions);
    return actions;
};