const express = require('express');
const router = express.Router();
const books = require('../controllers/books'); // Import
//const test = require('../controllers/test');


router.get('/books', books.findBooks);

router.get('/books/:isbn', books.findBooksByIsbn);

router.post('/books/createBooks', books.createBooks);

router.put('/books/updateBooks', books.updateBooks);

router.delete('/books/:isbn', books.deleteBooks);


module.exports = router;