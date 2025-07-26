import Joi from "joi";
import { ValidationError } from "../error/index.js";

/**
 * 
 * @param {Joi.Schema} schema 
 * @param {string} prop
 */
const validateSchema = (schema, prop = 'body') => (req, res, next) => {
    const { error } = schema.validate(req[prop]);
    if (error) {
        throw new ValidationError(error.details[0].message);
    }
    next();
}

export function validateBody(schema) {
    return validateSchema(schema, "body");
}

export function validateQuery(schema) {
    return validateSchema(schema, "query");
}