import Joi from "joi";
import { ValidationError } from "../error/index.js";

/**
 * 
 * @param {Joi.Schema} schema 
 * @param {string} prop
 */
const validateSchema = (schema, prop = 'body') => (req, res, next) => {
    const { error } = schema.validate(req[prop], { abortEarly: false });
    if (error) {
        console.error(error);
        const details = {};
        error.details.forEach((el) => {
            const path = el.path[0];
            const msg = el.message;
            details[path] = msg;
        });
        throw new ValidationError(error.toString(), details);
    }
    next();
}

export function validateBody(schema) {
    return validateSchema(schema, "body");
}

export function validateQuery(schema) {
    return validateSchema(schema, "query");
}