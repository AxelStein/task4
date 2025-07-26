import Joi from 'joi';

const emailSchema = Joi.string()
    .email()
    .required();

const passwordSchema = Joi.string()
    .min(1)
    .required();

export const loginSchema = Joi.object({
    email: emailSchema,
    password: passwordSchema,
}).required();

export const signupSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(99)
        .required(),

    email: emailSchema,

    password: passwordSchema,
}).required();