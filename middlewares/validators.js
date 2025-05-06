const { body } = require('express-validator');

exports.registerValidator = [
  body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

exports.loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .exists()
    .withMessage('Password is required')
];

exports.noteValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('content')
    .trim()
    .optional()
];