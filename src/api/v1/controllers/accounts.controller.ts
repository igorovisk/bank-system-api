import { Request, Response, NextFunction } from 'express';
import { AccountDTO } from '../interfaces/dtos';
import { AccountLogic } from '../logic';

export class AccountController {
  private logic: AccountLogic;

  constructor() {
    this.logic = new AccountLogic();
  }

  async getAccounts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const response = await this.logic.getAccounts();
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      next(error);
    }
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<AccountDTO> {
    try {
      const response = await this.logic.create();
      return response;
    } catch (error: unknown) {
      next(error);
    }
  }

  async updateAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const response = await this.logic.updateAccount(id, req.body);
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      next(error);
    }
  }

  // async deleteUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const response = await this.logic.deleteUser(id);
  //     return res.status(response ? 200 : 204).json(response);
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
}
