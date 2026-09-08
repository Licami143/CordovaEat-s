const { body, query, param } = require('express-validator');

const PRICE_RANGES = ['budget', 'moderate', 'expensive', 'premium'];
const SERVICES = ['dine_in', 'takeout', 'delivery'];

const parseJsonArraySanitizer = (val) => {
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [val];
    } catch {
      return val ? [val] : [];
    }
  }
  if (Array.isArray(val)) return val;
  return val ? [val] : [];
};

const createRestaurantValidator = [
  body('name').trim().isLength({ min: 2, max: 150 }).withMessage('Name is required (2-150 chars)'),
  body('description').optional({ values: 'falsy' }).trim().isLength({ max: 2000 }),
  body('address').trim().isLength({ min: 5, max: 255 }).withMessage('Address is required (at least 5 characters)'),
  body('barangay').optional({ values: 'falsy' }).trim().isLength({ max: 100 }),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude coordinate is required'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude coordinate is required'),
  body('phone').optional({ values: 'falsy' }).trim(),
  body('email').optional({ values: 'falsy' }).trim().isEmail().withMessage('Valid email is required if provided'),
  body('priceRange').isIn(PRICE_RANGES).withMessage(`priceRange must be one of ${PRICE_RANGES.join(', ')}`),
  body('servicesOffered')
    .customSanitizer(parseJsonArraySanitizer)
    .isArray({ min: 1 })
    .withMessage('At least one service must be offered')
    .custom((arr) => arr.every((s) => SERVICES.includes(s)))
    .withMessage(`services must be one of ${SERVICES.join(', ')}`),
  body('cuisineSlugs').optional().customSanitizer(parseJsonArraySanitizer).isArray(),
  body('dietaryOptions').optional().customSanitizer(parseJsonArraySanitizer).isArray(),
];

const updateRestaurantValidator = [
  param('id').isUUID().withMessage('Invalid restaurant id'),
  body('name').optional().trim().isLength({ min: 2, max: 150 }),
  body('priceRange').optional().isIn(PRICE_RANGES),
  body('servicesOffered').optional().customSanitizer(parseJsonArraySanitizer).isArray({ min: 1 }),
  body('latitude').optional().isFloat({ min: -90, max: 90 }),
  body('longitude').optional().isFloat({ min: -180, max: 180 }),
];

const searchValidator = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('priceRange').optional().isIn(PRICE_RANGES),
  query('sortBy').optional().isIn(['relevance', 'rating', 'distance', 'newest', 'price_asc', 'price_desc']),
  query('lat').optional().isFloat({ min: -90, max: 90 }),
  query('lng').optional().isFloat({ min: -180, max: 180 }),
];

const verifyBusinessValidator = [
  param('id').isUUID(),
  body('status').isIn(['verified', 'rejected']).withMessage('status must be verified or rejected'),
  body('rejectionReason').if(body('status').equals('rejected')).notEmpty().withMessage('Rejection reason is required'),
];

module.exports = {
  createRestaurantValidator,
  updateRestaurantValidator,
  searchValidator,
  verifyBusinessValidator,
  PRICE_RANGES,
  SERVICES,
};
