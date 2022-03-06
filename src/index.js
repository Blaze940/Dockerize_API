require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const pg = require('./postgres');
//const port = 5000;

const app = express();
const http = require('http');
const server = http.createServer(app);

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requiert des privilèges supérieures.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' est en cours d\'utilisation.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
module.exports = app;

const logical = require('./routes/logical');

app.use('/', logical);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
    console.log(`go to http://localhost:${port}`);
    pg.createConnection();
});

server.listen(port);
