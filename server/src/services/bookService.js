const bookRepository = require('../data/bookRepository');
const { withAvailability } = require('../utils/availability');
const { validateSearchQuery } = require('../validators/libraryValidators');
const AppError = require('../utils/AppError');

const bookService = {
  async searchBooks(rawQuery) {
    const query = validateSearchQuery(rawQuery);
    const books = await bookRepository.findAll({ query });

    return {
      query: query || null,
      count: books.length,
      books: books.map(withAvailability),
    };
  },

  async getBookById(id) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new AppError('Book not found', 404);
    }
    return { book: withAvailability(book) };
  },
};

module.exports = bookService;
