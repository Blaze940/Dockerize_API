const Validator = require('jsonschema').Validator;
const v = new Validator();
const pg = require('../postgres');
//const {Schema} = require("inspector");

const modelSignIn = {
    type: 'object',
    properties: {lastname: {type: String, required: true},
        firstname: {type: String, required: true},
        birthdate: {type: Date, required: false},
        email: {type: String, required: true},
        login: {type: String, required: true}
    }
};

const modelLogin = {
    type: 'object',
    properties: {
        email: {type: String, required: true},
        password: {type: String, required: true}
    }
};

exports.signIn = function(req, res){
    const query = 'INSERT INTO users(firstname, lastname, email, login, password) VALUES ($1, $2, $3, $4, $5)';
    try{
        let result = v.validate(modelSignIn, ...req.body);
        if(!result.valid){
            return res.status(400).send(result.errors["message"]);
        }
        pg.queryInsert(query, [req.body.firstname, req.body.lastname, req.body.email, req.body.login, req.body.password])
            .then(() => res.status(201).json({message: 'objet créé', type: req.body}))
            .catch(err => res.status(400).json({message: err}));
    } catch (error){
        res.status(422).json({message: error});
    }
};

exports.loginFunction = function(req, res){
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    try{
        let result = v.validate(modelLogin, ...req.body);
        if (!result.valid){
            return res.status(400).send(result.errors["message"]);
        }
        pg.query(query, [req.body.email, req.body.password])
            .then((thing) => res.status(200).json('Connexion au compte complète ' + thing))
            .catch(err => res.status(400).json(err));
    } catch (err){
        res.sendStatus(422);
    }
};
