import { Request, Response, NextFunction } from 'express';
import { TransactionLogic } from '../logic/transactions.logic';

export class TransactionController {
  private logic: TransactionLogic;

  constructor() {
    this.logic = new TransactionLogic();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const response = await this.logic.create(req, res, next);
    return res.status(response ? 200 : 204).json(response);
  }
  async getTransactions(req: Request, res: Response, next: NextFunction) {
    const response = await this.logic.getTransactions(req, res, next);
    return res.status(response ? 200 : 204).json(response);
  }
}
