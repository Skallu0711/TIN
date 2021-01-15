const express = require('express');
const router = express.Router();

const BookApiController = require('../../api/BooksAPI');

router.get('/', BookApiController.getBooks);
router.get('/:bookId', BookApiController.getBookById);
router.post('/', BookApiController.createBook);
router.put('/:bookId', BookApiController.updateBook);
router.delete('/:bookId', BookApiController.deleteBook);

module.exports = router;