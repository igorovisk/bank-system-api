import { UserRepository } from '../repositories';
import { UserDTO } from '../dtos';
import { NextFunction, Request, Response } from 'express';
import { Encrypt } from '../../../utils/encrypt/crypto';
import { AccountController } from '../controllers';
export class UserLogic {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getUsers(): Promise<UserDTO[]> {
    try {
      const response = await this.repository.getUsers();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<UserDTO> {
    try {
      const user = { ...req.body };

      const userExists = await this.repository.getUserByUsername(user.username);
      if (userExists) {
        return null;
      }

      const accountController = new AccountController();
      const account = await accountController.create(req, res, next);
      const encrypt = new Encrypt();
      const encryptedPassword = await encrypt.encryptString(user.password);

      if (account && encryptedPassword) {
        user.accountId = account.id;
        user.password = encryptedPassword;
      } else {
        throw new Error('Erro no processamento dos dados informados');
      }

      delete user['_originalData'];

      const response = await this.repository.create(user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<UserDTO> {
    try {
      const response = await this.repository.getUserById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, data: any): Promise<UserDTO> {
    try {
      const response = await this.repository.updateUser(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const response = await this.repository.deleteUser(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
