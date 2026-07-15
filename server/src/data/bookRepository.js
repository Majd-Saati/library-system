const { Op } = require('sequelize');
const Book = require('../models/Book');

const bookRepository = {
  findAll({ query } = {}) {
    const q = String(query || '').trim();
    const where = q
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${q}%` } },
            { author: { [Op.like]: `%${q}%` } },
            { isbn: { [Op.like]: `%${q}%` } },
          ],
        }
      : undefined;

    return Book.findAll({
      where,
      order: q ? [['title', 'ASC']] : [['id', 'ASC']],
    });
  },

  findById(id, options = {}) {
    return Book.findByPk(id, options);
  },

  async decrementCopies(book, transaction) {
    book.availableCopies -= 1;
    await book.save({ transaction });
    return book;
  },

  async incrementCopies(book, transaction) {
    book.availableCopies += 1;
    await book.save({ transaction });
    return book;
  },
};

module.exports = bookRepository;
