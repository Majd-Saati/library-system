const libraryService = require('../services/libraryService');
const { handleControllerError } = require('../utils/controller');

async function getMyLoans(req, res) {
  try {
    const data = await libraryService.getMyLoans(req.user.id);
    return res.json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch loans');
  }
}

async function getLoanById(req, res) {
  try {
    const data = await libraryService.getLoanById(req.params.id, req.user.id);
    return res.json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to fetch loan');
  }
}

async function returnLoan(req, res) {
  try {
    const data = await libraryService.returnBook(
      req.params.id,
      req.user.id,
      req.body,
    );

    return res.json({
      success: true,
      message: 'Book returned successfully',
      data,
    });
  } catch (error) {
    return handleControllerError(res, error, 'Failed to return book');
  }
}

module.exports = { getMyLoans, getLoanById, returnLoan };
