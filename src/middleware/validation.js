const { validationResult } = require('express-validator');
const response = require('../helpers/responseMsg');

const validationMiddleware = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return response(res, error.array()[0].msg, null, null, 400);
  }
  next();
};

module.exports = validationMiddleware;
