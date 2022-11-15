const auth = require('express').Router();
const authController = require('../controllers/auth');
const validationMiddleware = require('../middleware/validation');
const rules = require('./validationRules');

auth.post(
  '/register',
  rules.authRule,
  validationMiddleware,
  authController.register
);
auth.post('/login', rules.authRule, validationMiddleware, authController.login);

module.exports = auth;
