import { Request, Response, NextFunction } from 'express';
import { UserLogic } from '../logic';
import { Encrypt } from '../../../utils/encrypt/crypto';
import { AccountController } from './accounts.controller';
import * as Sentry from '@sentry/node';

export class UserController {
  private logic: UserLogic;

  constructor() {
    this.logic = new UserLogic();
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.logic.getUsers();
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      Sentry.captureException(error);
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = { ...req.body };
      const accountController = new AccountController();
      const encrypt = new Encrypt();

      const account = await accountController.create(req, res, next);
      const encryptedPassword = await encrypt.encryptString(user.password);

      if (account && encryptedPassword) {
        user.accountId = account?.id;
        user.password = encryptedPassword;
      } else {
        return res
          .status(500)
          .json('Erro no processamento dos dados informados');
      }

      const response = await this.logic.create(user);

      if (response) {
        return res.status(201).json(response);
      }

      return res
        .status(409)
        .json('Este nome de usuário já existe na nossa base de dados.');
    } catch (error) {
      Sentry.captureException(error);
      return next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await this.logic.getUserById(id);
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      Sentry.captureException(error);
      return next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await this.logic.updateUser(id, req.body);
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      Sentry.captureException(error);
      return next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await this.logic.deleteUser(id);
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      Sentry.captureException(error);
      return next(error);
    }
  }
}
