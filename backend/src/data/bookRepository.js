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

function statusFromCopies(availableCopies) {
  return availableCopies > 0 ? 'available' : 'checked_out';
}

function applyAvailability(book) {
  book.availabilityStatus = statusFromCopies(book.availableCopies);
  return book;
}

const bookRepository = {
  findAll({ query, genre, availability } = {}) {
    const where = {
      ...buildSearchWhere(query),
    };

    if (genre && genre !== 'all') {
      where.genre = genre;
    }

    if (availability === 'available' || availability === 'checked_out') {
      where.availabilityStatus = availability;
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
    book.availableCopies = Math.max(0, book.availableCopies - 1);
    applyAvailability(book);
    await book.save({ transaction });
    return book;
  },

  async incrementCopies(book, transaction) {
    book.availableCopies += 1;
    applyAvailability(book);
    await book.save({ transaction });
    return book;
  },

  /** Keep availabilityStatus column aligned with availableCopies (startup backfill). */
  async syncAvailabilityStatuses() {
    const books = await Book.findAll();
    await Promise.all(
      books.map(async (book) => {
        const next = statusFromCopies(book.availableCopies);
        if (book.availabilityStatus !== next) {
          book.availabilityStatus = next;
          await book.save();
        }
      }),
    );
  },
};

module.exports = bookRepository;
