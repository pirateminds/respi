// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

import express from 'express';
import config from './config';
import fs from 'fs';
import { createServer } from 'http';
import configDefault from './express';
import loadRoutes from './load-routes';

// Setup server
const app = express();
let server = createServer(app);

configDefault(app);
loadRoutes(app);


// This line is from the Node.js HTTPS documentation.
// var options = {
//     key: fs.readFileSync('./hacksparrow-key.pem'),
//     cert: fs.readFileSync('./hacksparrow-cert.pem')
// };

//var server = require('https').createServer(options, app);

// Start server
server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
export default app;
