const Book = require('../models/Book');
const Loan = require('../models/Loan');

const loanRepository = {
  findActiveByUser(userId) {
    return Loan.findAll({
      where: {
        userId,
        returnedAt: null,
      },
      include: [{ model: Book, as: 'book' }],
      order: [['borrowedAt', 'DESC']],
    });
  },

  findActiveByIdForUser(id, userId, options = {}) {
    const { includeBook = false, transaction, lock } = options;

    return Loan.findOne({
      where: {
        id,
        userId,
        returnedAt: null,
      },
      include: includeBook ? [{ model: Book, as: 'book' }] : undefined,
      transaction,
      lock,
    });
  },

  create(data, options = {}) {
    return Loan.create(data, options);
  },

  async markReturned(loan, transaction) {
    loan.returnedAt = new Date();
    await loan.save({ transaction });
    return loan;
  },
};

module.exports = loanRepository;
