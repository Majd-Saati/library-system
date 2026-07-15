const User = require('../models/User');

const userRepository = {
  findByEmail(email) {
    return User.findOne({ where: { email: email.toLowerCase().trim() } });
  },

  findById(id) {
    return User.findByPk(id);
  },

  create(data) {
    return User.create(data);
  },
};

module.exports = userRepository;
