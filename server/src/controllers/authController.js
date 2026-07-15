const authService = require('../services/authService');
const { handleControllerError } = require('../utils/controller');

async function login(req, res) {
  try {
    const data = await authService.login(req.body);

    return res.json({
      success: true,
      message: 'Login successful',
      data,
    });
  } catch (error) {
    return handleControllerError(res, error, 'Internal server error');
  }
}

async function me(req, res) {
  try {
    const data = await authService.getCurrentUser(req.user.id);
    return res.json({ success: true, data });
  } catch (error) {
    return handleControllerError(res, error, 'Internal server error');
  }
}

module.exports = { login, me };
