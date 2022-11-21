// eslint-disable-next-line max-classes-per-file
import * as Joi from 'joi';
import { SchemaValidator } from '../validations';

const transactionSchema = Joi.object({
  id: Joi.string(),
  amount: Joi.number().required(),
  creditedAccountId: Joi.string().required(),
  debitedAccountId: Joi.string().required(),
  createdAt: Joi.date(),
}).meta({ className: 'Transaction' });

export class getTransactionValidator {
  private static params = Joi.object({
    id: Joi.string().required(),
  });

  static get(): SchemaValidator {
    return {
      params: this.params,
    };
  }
}

export class CreateTransactionValidator {
  private static body = transactionSchema;

  static post(): SchemaValidator {
    return {
      body: this.body,
    };
  }
}
