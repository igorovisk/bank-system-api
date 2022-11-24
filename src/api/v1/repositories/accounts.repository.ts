import { PrismaClient } from '@prisma/client';
import { AccountDTO } from '../dtos';
import { AccountInterface } from '../interfaces/account.interface';
const prisma = new PrismaClient();

export class AccountRepository {
  async getAccounts(): Promise<AccountDTO[]> {
    try {
      const response = await prisma.accounts.findMany();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(account: AccountInterface): Promise<AccountDTO> {
    try {
      const response = await prisma.accounts.create({ data: account });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAccountById(id: string): Promise<AccountDTO> {
    try {
      const account = await prisma.accounts.findUnique({
        where: {
          id,
        },
      });
      return account;
    } catch (error) {
      throw error;
    }
  }

  async updateAccount(id: string, data: any): Promise<AccountDTO> {
    try {
      const account = await prisma.accounts.update({
        where: {
          id,
        },
        data,
      });
      return account;
    } catch (error) {
      throw error;
    }
  }
}
