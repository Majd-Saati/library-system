require('dotenv').config();
const sequelize = require('../config/database');
const User = require('../models/User');

async function seed() {
  try {
    await sequelize.sync();

    const email = 'majd@titan-tech.com';
    const existing = await User.findOne({ where: { email } });

    if (existing) {
      console.log(`User already exists: ${email}`);
      process.exit(0);
    }

    const user = await User.create({
      email,
      password: 'password123',
      name: 'Majd',
    });

    console.log('Seeded user:');
    console.log(`  email:    ${user.email}`);
    console.log('  password: password123');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
