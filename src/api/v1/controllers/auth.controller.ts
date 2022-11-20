import { Request, Response, NextFunction } from 'express';
import { AuthLogic } from '../logic';
import { Encrypt } from '../../../utils/encrypt/crypto';
import * as Sentry from '@sentry/node';

export class AuthController {
  private logic: AuthLogic;

  constructor() {
    this.logic = new AuthLogic();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const response = await this.logic.login(username, password);
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      Sentry.captureException(error);
      return next(error);
    }
  }
}
