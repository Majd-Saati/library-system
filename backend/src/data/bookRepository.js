const { Op } = require('sequelize');
const Book = require('../models/Book');

function buildSearchWhere(query) {
  const q = String(query || '').trim();
  if (!q) return {};

  return {
    [Op.or]: [
      { title: { [Op.like]: `%${q}%` } },
      { author: { [Op.like]: `%${q}%` } },
      { isbn: { [Op.like]: `%${q}%` } },
    ],
  };
}

const bookRepository = {
  findAll({ query, genre, availability } = {}) {
    const where = {
      ...buildSearchWhere(query),
    };

    if (genre && genre !== 'all') {
      where.genre = genre;
    }

    if (availability === 'available') {
      where.availableCopies = { [Op.gt]: 0 };
    } else if (availability === 'checked_out') {
      where.availableCopies = { [Op.lte]: 0 };
    }

    return Book.findAll({
      where,
      order: [
        ['title', 'ASC'],
        ['id', 'ASC'],
      ],
    });
  },

  async countMatching({ query } = {}) {
    return Book.count({
      where: buildSearchWhere(query),
    });
  },

  async findGenres() {
    const rows = await Book.findAll({
      attributes: ['genre'],
      group: ['genre'],
      order: [['genre', 'ASC']],
      raw: true,
    });

    return rows.map((row) => row.genre).filter(Boolean);
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
