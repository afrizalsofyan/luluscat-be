const bcrypt = require('bcrypt');
const { body } = require('express-validator');

exports.authRule = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be greather then 6 characters')
    .customSanitizer(async (val) => {
      const hashing = await bcrypt.hash(val, 10);
      return hashing;
    })
    .optional({ nullable: true }),
  body('email')
    .isEmail()
    .withMessage('Format email invalid')
    .optional({ nullable: true }),
  body('phoneNumber').isString().optional({ nullable: true }),
  body('fullName')
    .isLength({ min: 6 })
    .withMessage('Full name must be greater than 6 caharacters')
    .optional({ nullable: true }),
];
