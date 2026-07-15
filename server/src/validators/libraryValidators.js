const AppError = require('../utils/AppError');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{8,20}$/;

const AVAILABILITY_FILTERS = new Set(['all', 'available', 'checked_out']);

function validateSearchQuery(rawQuery) {
  const query = String(rawQuery || '').trim();

  if (query.length > 120) {
    throw new AppError('Search query must be 120 characters or fewer', 400);
  }

  return query;
}

function validateBookListParams(query = {}) {
  const q = validateSearchQuery(query.q);

  const genreRaw = String(query.genre || 'all').trim();
  const genre = genreRaw.length === 0 ? 'all' : genreRaw;
  if (genre.length > 60) {
    throw new AppError('Genre must be 60 characters or fewer', 400);
  }

  const availability = String(query.availability || 'all').trim();
  if (!AVAILABILITY_FILTERS.has(availability)) {
    throw new AppError(
      'Availability must be one of: all, available, checked_out',
      400,
    );
  }

  return { q, genre, availability };
}

function validateCheckoutInput(body = {}) {
  const fullName = String(body.fullName || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const phone = String(body.phone || '').trim();
  const address = String(body.address || '').trim();

  if (fullName.length < 3) {
    throw new AppError('Full name must be at least 3 characters', 400);
  }
  if (!EMAIL_RE.test(email)) {
    throw new AppError('Enter a valid email address', 400);
  }
  if (!PHONE_RE.test(phone)) {
    throw new AppError('Enter a valid phone number', 400);
  }
  if (address.length < 5) {
    throw new AppError('Address must be at least 5 characters', 400);
  }

  return { fullName, email, phone, address };
}

function validateReturnInput(body = {}, loanEmail) {
  const email = String(body.email || '').trim().toLowerCase();
  const conditionNotes = String(body.conditionNotes || '').trim();
  const confirmReturn = Boolean(body.confirmReturn);

  if (!EMAIL_RE.test(email)) {
    throw new AppError('Enter a valid email address', 400);
  }
  if (email !== String(loanEmail || '').trim().toLowerCase()) {
    throw new AppError('Email must match the borrower on this loan', 400);
  }
  if (conditionNotes.length > 500) {
    throw new AppError('Notes must be 500 characters or fewer', 400);
  }
  if (!confirmReturn) {
    throw new AppError('Please confirm the return', 400);
  }

  return { email, conditionNotes, confirmReturn };
}

module.exports = {
  validateSearchQuery,
  validateBookListParams,
  validateCheckoutInput,
  validateReturnInput,
};
