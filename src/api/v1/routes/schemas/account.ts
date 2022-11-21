// eslint-disable-next-line max-classes-per-file
import * as Joi from 'joi';
import { SchemaValidator } from '../validations';

const accountSchema = Joi.object({
  id: Joi.string(),
  balance: Joi.number().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
}).meta({ className: 'Account' });

export class getAccountValidator {
  private static params = Joi.object({
    id: Joi.string().required(),
  });

  static get(): SchemaValidator {
    return {
      params: this.params,
    };
  }
}

export class CreateAccountValidator {
  private static body = accountSchema;

  static post(): SchemaValidator {
    return {
      body: this.body,
    };
  }
}
