const jwt = require('jsonwebtoken');
const userRepository = require('../data/userRepository');
const AppError = require('../utils/AppError');

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );
}

const authService = {
  async login({ email, password }) {
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
      throw new AppError('Invalid email or password', 401);
    }

    return {
      user: user.toSafeJSON(),
      token: signToken(user),
    };
  },

  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return { user: user.toSafeJSON() };
  },
};

module.exports = authService;
