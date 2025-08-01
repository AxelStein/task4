import Joi from 'joi';

const emailSchema = Joi.string()
    .email()
    .required()
    .messages({
        'string.email': 'Invalid email',
        'string.empty': 'Email is required'
    });

const passwordSchema = Joi.string()
    .regex(/^\S*$/)
    .required()
    .messages({
        'string.pattern.base': 'No whitespaces allowed in password',
        'string.empty': 'Password is required'
    });

export const loginSchema = Joi.object({
    email: emailSchema,
    password: passwordSchema,
}).required();

export const signupSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(99)
        .required(),
    email: emailSchema,
    password: passwordSchema,
}).required();

export const resetPasswordSchema = Joi.object({
    email: emailSchema
}).required();

export const restorePasswordSchema = Joi.object({
    token: Joi
        .string()
        .token()
        .required(),
    password: passwordSchema
}).required();