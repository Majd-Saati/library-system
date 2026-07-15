const Book = require('../models/Book');
const booksData = require('./booksData');

async function seedBooks() {
  const count = await Book.count();
  if (count > 0) {
    console.log(`Books already seeded (${count})`);
    return;
  }

  await Book.bulkCreate(
    booksData.map((book) => ({
      ...book,
      availabilityStatus:
        book.availableCopies > 0 ? 'available' : 'checked_out',
    })),
  );
  console.log(`Seeded ${booksData.length} books`);
}

module.exports = seedBooks;
