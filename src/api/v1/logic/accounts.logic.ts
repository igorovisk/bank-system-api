import { AccountRepository } from '../repositories';
import { AccountDTO } from '../interfaces/dtos';
import { NextFunction, Request, Response } from 'express';

export class AccountLogic {
  private repository: AccountRepository;

  constructor() {
    this.repository = new AccountRepository();
  }

  async getAccounts(): Promise<AccountDTO[]> {
    try {
      const response = await this.repository.getAccounts();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(): Promise<AccountDTO> {
    try {
      const account = { balance: 100.0 };
      const response = await this.repository.create(account);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateAccount(id: string, data: any): Promise<AccountDTO> {
    try {
      const response = await this.repository.updateAccount(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
