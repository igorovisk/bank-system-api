import { Request, Response, NextFunction } from 'express';
import { AccountLogic } from '../logic';
import * as Sentry from '@sentry/node';

export class AccountController {
  private logic: AccountLogic;

  constructor() {
    this.logic = new AccountLogic();
  }

  async getAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.logic.getAccounts();
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      Sentry.captureException(error);
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const account = { balance: 100.0 };

      const response = await this.logic.create(account);
      if (response) {
        return response;
      }
    } catch (error) {
      Sentry.captureException(error);
      return next(error);
    }
  }

  // async updateAccount(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const response = await this.logic.updateAccount(id, req.body);
  //     return res.status(response ? 200 : 204).json(response);
  //   } catch (error) {
  //     Sentry.captureException(error);
  //     return next(error);
  //   }
  // }

  // async deleteUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const response = await this.logic.deleteUser(id);
  //     return res.status(response ? 200 : 204).json(response);
  //   } catch (error) {
  //     Sentry.captureException(error);
  //     return next(error);
  //   }
  // }
}