const { oneOf, body } = require('express-validator');
const validationResponses = require('../constants/validationResponses');

module.exports = oneOf([
    body('rating').isFloat({ min: 1, max: 5 }).withMessage(validationResponses.rating),
    body('content').notEmpty().withMessage(validationResponses.review),
]);
