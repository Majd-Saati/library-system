const sequelize = require('../config/database');
const bookRepository = require('../data/bookRepository');
const loanRepository = require('../data/loanRepository');
const purchaseRepository = require('../data/purchaseRepository');
const { withAvailability, isAvailable } = require('../utils/availability');
const { validateCheckoutInput, validateReturnInput } = require('../validators/libraryValidators');
const AppError = require('../utils/AppError');

const libraryService = {
  async borrowBook(bookId, userId, body) {
    const fields = validateCheckoutInput(body);
    const transaction = await sequelize.transaction();

    try {
      const book = await bookRepository.findById(bookId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!book) {
        throw new AppError('Book not found', 404);
      }
      if (!isAvailable(book)) {
        throw new AppError(
          'This book is checked out and cannot be borrowed',
          409,
        );
      }

      await bookRepository.decrementCopies(book, transaction);

      const loan = await loanRepository.create(
        {
          bookId: book.id,
          userId,
          fullName: fields.fullName,
          email: fields.email,
          phone: fields.phone,
          address: fields.address,
        },
        { transaction },
      );

      await transaction.commit();

      return {
        loan,
        book: withAvailability(book),
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async buyBook(bookId, userId, body) {
    const fields = validateCheckoutInput(body);
    const transaction = await sequelize.transaction();

    try {
      const book = await bookRepository.findById(bookId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!book) {
        throw new AppError('Book not found', 404);
      }
      if (!isAvailable(book)) {
        throw new AppError(
          'This book is out of stock and cannot be purchased',
          409,
        );
      }

      await bookRepository.decrementCopies(book, transaction);

      const purchase = await purchaseRepository.create(
        {
          bookId: book.id,
          userId,
          fullName: fields.fullName,
          email: fields.email,
          phone: fields.phone,
          address: fields.address,
          price: book.price,
        },
        { transaction },
      );

      await transaction.commit();

      return {
        purchase,
        book: withAvailability(book),
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async getMyLoans(userId) {
    const loans = await loanRepository.findActiveByUser(userId);
    return {
      loans: loans.map((loan) => {
        const plain = loan.toJSON();
        return {
          ...plain,
          book: plain.book ? withAvailability(plain.book) : null,
        };
      }),
    };
  },

  async getLoanById(loanId, userId) {
    const loan = await loanRepository.findActiveByIdForUser(loanId, userId, {
      includeBook: true,
    });

    if (!loan) {
      throw new AppError('Loan not found', 404);
    }

    const plain = loan.toJSON();
    return {
      loan: {
        ...plain,
        book: plain.book ? withAvailability(plain.book) : null,
      },
    };
  },

  async returnBook(loanId, userId, body) {
    const activeLoan = await loanRepository.findActiveByIdForUser(
      loanId,
      userId,
    );

    if (!activeLoan) {
      throw new AppError('Active loan not found', 404);
    }

    validateReturnInput(body, activeLoan.email);

    const transaction = await sequelize.transaction();

    try {
      const loan = await loanRepository.findActiveByIdForUser(loanId, userId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!loan) {
        throw new AppError('Active loan not found', 404);
      }

      const book = await bookRepository.findById(loan.bookId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!book) {
        throw new AppError('Book not found', 404);
      }

      await loanRepository.markReturned(loan, transaction);
      await bookRepository.incrementCopies(book, transaction);
      await transaction.commit();

      return {
        loan,
        book: withAvailability(book),
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = libraryService;
