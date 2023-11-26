import * as Joi from 'joi';
import { passwordRegex } from '../utils/regex';

export const CreateUserSchema = Joi.object()
  .keys({
    name: Joi.string()
      .min(1)
      .required()
      .error(() => new Error('Name is invalid')),
    email: Joi.string()
      .email()
      .required()
      .error(() => new Error('E-mail is invalid')),
    password: Joi.string()
      .pattern(new RegExp(passwordRegex))
      .required()
      .error(() => new Error('Password is invalid')),
  })
  .required();
