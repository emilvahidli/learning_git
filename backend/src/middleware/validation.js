import { body, validationResult } from 'express-validator';

export const validateAppeal = [
  // Email validation
  body('mail')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .normalizeEmail(),

  // Phone number validation
  body('phone_number')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Phone number must be between 1 and 50 characters'),

  // Appeal (enum integer) validation
  body('appeal')
    .notEmpty()
    .withMessage('Appeal is required')
    .isInt({ min: 1, max: 9 })
    .withMessage('Appeal must be an integer between 1 and 9'),

  // Name validation
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 1, max: 30 })
    .withMessage('Name must be between 1 and 30 characters'),

  // Message validation
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters'),

  // Error handling middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }
    next();
  },
];
