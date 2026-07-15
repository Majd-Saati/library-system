require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');
require('./models/Book');
require('./models/Loan');
require('./models/Purchase');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const loansRoutes = require('./routes/loans');
const seedBooks = require('./seeders/seedBooks');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/loans', loansRoutes);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const email = 'majd@titan-tech.com';
    const existing = await User.findOne({ where: { email } });

    if (!existing) {
      await User.create({
        email,
        password: 'password123',
        name: 'Majd',
      });
      console.log(`Default user created: ${email} / password123`);
    }

    await seedBooks();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Login: POST http://localhost:${PORT}/api/auth/login`);
      console.log(`Books: GET  http://localhost:${PORT}/api/books`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
