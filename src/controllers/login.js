const Validator = require('jsonschema').Validator;
const v = new Validator();
const pg = require('../postgres');
//const {Schema} = require("inspector");

const modelSignIn = {
    type: 'object',
    properties: {
        lastname: {type: String, required: true},
        firstname: {type: String, required: true},
        email: {type: String, required: true},
        login: {type: String, required: true},
        password: {type: String, required: true}
    }
};

const modelLogin = {
    type: 'object',
    properties: {
        login: {type: String, required: true},
        password: {type: String, required: true}
    }
};

exports.signIn = function(req, res){
    const query = 'INSERT INTO users(firstname, lastname, email, login, password) VALUES ($1, $2, $3, $4, $5)';
    try{
        let result = v.validate(req.body, modelSignIn);
        if(!result.valid){
            let arrayError = [];
            for (let i = 0; i < result.errors.length; i++) {
                arrayError.push(result.errors[i].path[0])
            }
            return res.status(400).send({error: `Il manque le(s) champ(s) '${arrayError.join(", ")}' à la requête, impossible de créer l'utilisateur`});
        }
        if (req.body.password.length > 10 || req.body.login.length > 10){
            return res.status(400).json({message: "Le login et le mot de passe doivent être de 10 caractères maximum"});
        }
        pg.queryInsert(query, [req.body.firstname, req.body.lastname, req.body.email, req.body.login, req.body.password])
            .then(() => res.status(201).json({message: 'user créé', type: req.body}))
            .catch(err => res.status(400).json({message: err.detail}));
    } catch (error){
        res.status(422).json({message: error});
    }
};

exports.loginFunction = function(req, res){
    const query = `SELECT * FROM users WHERE login = '${req.body.login}'AND password = '${req.body.password}'`;
    try{
        let result = v.validate(req.body, modelLogin);
        let arrayError = [];
        if (!result.valid){
            for (let i = 0; i < result.errors.length; i++) {
                arrayError.push(result.errors[i].path[0])
            }
            return res.status(400).json({error: `Il manque le(s) champ(s) '${arrayError.join(", ")}' à la requête`});
        }
        pg.query(query, null)
            .then(thing => {
                if(thing.rows.length === 0){
                    return res.status(400).json({message: "Le login ou le mot de passe est incorrect, vérifiez vos infos avant"})
                }
                res.status(200).json('Connexion au compte complète')
            })
            .catch(err => res.status(400).json({message: err}));
    } catch (err){
        res.sendStatus(422);
    }
};
