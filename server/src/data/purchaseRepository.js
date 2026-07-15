const Purchase = require('../models/Purchase');

const purchaseRepository = {
  create(data, options = {}) {
    return Purchase.create(data, options);
  },
};

module.exports = purchaseRepository;
