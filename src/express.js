import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';
import config from './config';
import device from 'express-device';

export default app => {
  const env = app.get('env');

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(device.capture({ parseUserAgent: true }));
  device.enableDeviceHelpers(app);
  
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client/release', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'client/release' )));
    app.set('appPath', `${config.root}/client/release`);
  }

  if ('development' === env || 'test' === env) {
    //app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, process.env.DIST ? 'client/release' : `${__dirname}/../gen-tv-site/client`)));
    app.set('appPath', process.env.DIST ? 'client/release' : `${__dirname}/../gen-tv-site/client`);
  }
};
