const bookRepository = require('../data/bookRepository');
const { withAvailability } = require('../utils/availability');
const { validateBookListParams } = require('../validators/libraryValidators');
const AppError = require('../utils/AppError');

const bookService = {
  async searchBooks(rawParams = {}) {
    const params = validateBookListParams(rawParams);
    const listParams = {
      query: params.q,
      genre: params.genre,
      availability: params.availability,
    };

    const [books, total, genres] = await Promise.all([
      bookRepository.findAll(listParams),
      bookRepository.countMatching({ query: params.q }),
      bookRepository.findGenres(),
    ]);

    return {
      query: params.q || null,
      filters: {
        genre: params.genre,
        availability: params.availability,
      },
      count: books.length,
      total,
      genres,
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
