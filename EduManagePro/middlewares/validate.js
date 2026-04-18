'use strict';
const ApiResponse = require('../utils/ApiResponse');

/**
 * Usage: validate(schema) where schema is a Joi schema
 * Validates req.body
 */
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(d => ({ field: d.context.key, message: d.message }));
    return ApiResponse.badRequest(res, 'Données invalides', errors);
  }
  next();
};

module.exports = validate;
