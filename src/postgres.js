const { Client } = require('pg');

let client;

const createConnection = () => {
    client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    });
    client.connect()
        .then(() => console.log('connexion réussi'))
        .catch(error => console.error(error));
}


module.exports = {
    createConnection,
    query: (text, params) => client.query(text, params),
    queryAll: (text) => client.query(text),
    queryInsert: (text, params) => client.query(text, params),
    queryUpdate: (text, params) => client.query(text, params),
    queryDelete: (text, params) => client.query(text, params),
};