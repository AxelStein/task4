import Joi from 'joi';

const idsSchema = Joi.array()
    .items(Joi.number().integer())
    .min(1)
    .required();

export const getListSchema = Joi.object({
    sortBy: Joi.string().valid('lastSeen', 'name'),
    sortAsc: Joi.bool(),
});

export const blockByIdsSchema = Joi.object({
    ids: idsSchema,
    block: Joi.boolean().required(),
}).required();

export const deleteByIdsSchema = Joi.object({
    ids: idsSchema
}).required();