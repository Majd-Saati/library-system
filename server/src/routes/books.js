const express = require('express');
const {
  getBooks,
  getBookById,
  borrowBook,
  buyBook,
} = require('../controllers/booksController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/:id/borrow', authenticate, borrowBook);
router.post('/:id/buy', authenticate, buyBook);

module.exports = router;
