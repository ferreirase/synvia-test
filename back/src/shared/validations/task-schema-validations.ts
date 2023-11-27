import * as Joi from 'joi';

export const CreateTaskSchema = Joi.object()
  .keys({
    title: Joi.string()
      .min(1)
      .required()
      .error(() => new Error('Title is invalid')),
    description: Joi.string()
      .min(1)
      .required()
      .error(() => new Error('Description is invalid')),
    tags: Joi.array()
      .min(1)
      .required()
      .error(() => new Error('Tags is invalid')),
    responsibleId: Joi.number()
      .optional()
      .error(() => new Error('Responsible ID is invalid')),
  })
  .required();
