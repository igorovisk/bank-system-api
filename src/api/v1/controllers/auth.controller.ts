import { Request, Response, NextFunction } from 'express';
import { AuthLogic } from '../logic';

export class AuthController {
  private logic: AuthLogic;

  constructor() {
    this.logic = new AuthLogic();
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { username, password } = req.body;
      const response = await this.logic.login(username, password);
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      next(error);
    }
  }
}
