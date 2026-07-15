function withAvailability(book) {
  const plain =
    book && typeof book.toJSON === 'function' ? book.toJSON() : book;

  if (!plain) return null;

  return {
    ...plain,
    availabilityStatus:
      plain.availableCopies > 0 ? 'available' : 'checked_out',
  };
}

function isAvailable(book) {
  return Boolean(book && book.availableCopies > 0);
}

module.exports = { withAvailability, isAvailable };
