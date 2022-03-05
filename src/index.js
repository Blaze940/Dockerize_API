require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const pg = require('./postgres');
const port = 5000;

const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const logical = require('./routes/logical');
logical.post;
app.use('/', logical);

app.listen(port, () => {
    console.log('listening on port ' + port);
    pg.createConnection();
});

module.exports = app;