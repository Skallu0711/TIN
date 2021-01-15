const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');

router.get('/', booksController.showBooksList);
router.get('/add', booksController.showBooksFormNew);
router.get('/edit/:bookId', booksController.showBooksFormEdit);
router.get('/details/:bookId', booksController.showBooksDetails);

router.post('/add', booksController.addBook); 
router.post('/edit', booksController.updateBook);
router.get('/delete/:bookId', booksController.deleteBook);

module.exports = router;