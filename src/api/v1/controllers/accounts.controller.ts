import { Request, Response, NextFunction } from 'express';
import { AccountDTO } from '../dtos';
import { AccountLogic } from '../logic';

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
      return next(error);
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
    } catch (error) {
      //TODO VERIFICAR A NEXT FUNCTION QUANDO COLOCO O RETORNO DO TYPESCRIPT DESSA FUNÇÃO COMO PRIMISSE <RESPONSE>
      // return next(error);
    }
  }

  async updateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await this.logic.updateAccount(id, req.body);
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      return next(error);
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
