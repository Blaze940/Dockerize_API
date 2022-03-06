const express = require('express');
const router = express.Router();
// Import des fonctions
const books = require('../controllers/books');
const connexion = require('../controllers/login');


router.get('/books', books.findBooks);

router.get('/books/:isbn', books.findBooksByIsbn);

router.post('/books/createBooks', books.createBooks);

router.put('/books/updateBooks', books.updateBooks);

router.delete('/books/:isbn', books.deleteBooks);

router.post('/signin', connexion.signIn);

router.post('/login', connexion.loginFunction);


module.exports = router;