// eslint-disable-next-line max-classes-per-file
import * as Joi from 'joi';
import { SchemaValidator } from '../validations';

const transactionSchema = Joi.object({
  id: Joi.string(),
  amount: Joi.number().required(),
  debitedAccountId: Joi.string().required(),
  createdAt: Joi.date(),
}).meta({ className: 'Transaction' });

export class GetTransactionValidator {
  private static params = Joi.object({
    accountId: Joi.string().required(),
  });

  static get(): SchemaValidator {
    return {
      params: this.params,
    };
  }
}

export class CreateTransactionValidator {
  private static body = transactionSchema;
  private static params = Joi.object({
    accountId: Joi.string().required(),
  });
  static post(): SchemaValidator {
    return {
      params: this.params,
      body: this.body,
    };
  }
}
