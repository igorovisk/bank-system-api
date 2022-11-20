// eslint-disable-next-line max-classes-per-file
import * as Joi from 'joi';
import { SchemaValidator } from '../validations';

const userSchema = Joi.object({
  id: Joi.number(),
  fullname: Joi.string().required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().required(),
  cpf: Joi.string().required(),
  password: Joi.string().min(8).required(),
}).meta({ className: 'User' });

export class GetUserValidator {
  private static params = Joi.object({
    id: Joi.number().required(),
  });

  static get(): SchemaValidator {
    return {
      params: this.params,
    };
  }
}

export class CreateUserValidator {
  private static body = userSchema;

  static post(): SchemaValidator {
    return {
      body: this.body,
    };
  }
}
