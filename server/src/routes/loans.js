const express = require('express');
const {
  getMyLoans,
  getLoanById,
  returnLoan,
} = require('../controllers/loansController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);
router.get('/', getMyLoans);
router.get('/:id', getLoanById);
router.post('/:id/return', returnLoan);

module.exports = router;
