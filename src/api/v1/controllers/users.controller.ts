import { Request, Response, NextFunction } from 'express';
import { UserLogic } from '../logic';

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
      return next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.logic.create(req, res, next);
      if (response) {
        return res.status(201).json(response);
      }
      return res
        .status(409)
        .json('Este nome de usuário já existe na nossa base de dados.');
    } catch (error) {
      return next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id, 'ID');
      const response = await this.logic.getUserById(id);
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      return next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await this.logic.updateUser(id, req.body);
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      return next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await this.logic.deleteUser(id);
      return res.status(response ? 200 : 204).json(response);
    } catch (error) {
      return next(error);
    }
  }
}
