const pg = require('../postgres');

exports.findBooks = function(req, res) {
    pg.queryAll('SELECT * FROM BOOKS')
        .then(thing => {
            if (thing.rowCount === 0){
                return res.status(404).json({error: "Aucun livre dans la base de données"})
            }
            res.status(200).json(thing.rows);
        })
        .catch(error => res.status(500).json(error));
};

/**
 * 1. Postman does the Request by adding the parameters :isbn
 * e.g    GET /books/81-100  ( 81-100 = value of isbn )
 * 
 * 2. Get that value in our controller
 * 3. Use that value to get books  ( using select )
 */
exports.findBooksByIsbn = function(req, res) {
    const isbnValue = req.params.isbn;
    pg.query(`SELECT * FROM BOOKS WHERE isbn='${isbnValue}'`)
        .then(thing => {
            if(thing.rowCount == 0) {
                res.status(404).send(JSON.stringify({message: 'Isbn invalide'}));
                return;
            }
            res.status(200).json(thing.rows);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.createBooks = function(req, res) {
    const text = 'INSERT INTO books(isbn, title, author, overview, picture, read_count) VALUES ($1, $2, $3, $4, $5, $6)';
    // console.log('req.body ->', req.body);
    const data = req.body;
    // console.log("data.isbn ->", data.isbn);
    pg.queryInsert(text, [data.isbn, data.title, data.author, data.overview, data.picture, data.read_count])
        .then(thing => {
            res.status(201).send(JSON.stringify({message: 'Le livre a bien été créé.'}));
        })
        .catch(error => {
            res.status(422).send(JSON.stringify({erreur: error.detail}));
        });
    // ici
    // ici
};


/**
 * 1 -> { isbn: 4 }
 * 2 -> { title: 'abcd' }   -> THROW error
 * 3 -> { isbn: 'unknown isbn here' }   -> THROW error
 */
exports.updateBooks = function(req, res) {
    const data = req.body;
    const text = `UPDATE BOOKS 
    SET title = $1, author = $2, overview = $3, picture = $4, read_count = $5
    WHERE isbn = $6; `;

    const dataList = [
        data.title, data.author, data.overview, data.picture, data.read_count, data.isbn
    ];

    /**
     * TODO -> ( if isbn is not sent from Postman -> throw him a 422 ) OK
     * for all other fields
     */

    if (req.body.isbn && req.body.title && req.body.author && req.body.overview && req.body.picture && req.body.read_count) {
        // Get the Books + verify if exists
        pg.query(`SELECT * FROM books WHERE isbn='${req.body.isbn}'`).then(selectResult => {
            if (selectResult.rows.length === 0) {
                return res.status(404).json(new Error('404 Not Found'));
            }
            // Update -> 
            pg.queryUpdate(text, [data.title, data.author, data.overview, data.picture, data.read_count, data.isbn])
                .then(updateResult => {
                    return res.status(200).send(JSON.stringify({message: 'Les données du livre ont été mises à jour'}));
                });
        }).catch(error => {
            res.status(500).json(error);
        });
    } else {
        // throw error here
        res.status(422).json(new Error('missing field'));
    }
};

exports.deleteBooks = function(req, res) {
    /**
     * To Do:
     * - get parameter isbn
     * - delete by book isbn
     */

    const isbnValue = req.params.isbn;

    pg.queryDelete(`DELETE FROM BOOKS WHERE isbn='${isbnValue}'`)
        .then(deleteResult => {
            if(deleteResult.rowCount == 0) {
                res.status(404).send(JSON.stringify({message: 'Isbn invalide'}));
                return;
            }
            res.status(204).send(JSON.stringify({message: `Le livre a bien été supprimé`}));
        })
        .catch(error => {
            res.status(404).json(error);
        });
};