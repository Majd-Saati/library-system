const bookService = require('../services/bookService');
const libraryService = require('../services/libraryService');
const { handleControllerError } = require('../utils/controller');

async function getBooks(req, res) {
  try {
    const data = await bookService.searchBooks(req.query);
    return res.json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch books');
  }
}

async function getBookById(req, res) {
  try {
    const data = await bookService.getBookById(req.params.id);
    return res.json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch book');
  }
}

async function borrowBook(req, res) {
  try {
    const data = await libraryService.borrowBook(
      req.params.id,
      req.user.id,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data,
    });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to borrow book');
  }
}

async function buyBook(req, res) {
  try {
    const data = await libraryService.buyBook(
      req.params.id,
      req.user.id,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: 'Book purchased successfully',
      data,
    });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to buy book');
  }
}

module.exports = {
  getBooks,
  getBookById,
  borrowBook,
  buyBook,
};
