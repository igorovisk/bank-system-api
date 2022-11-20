import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class AccountRepository {
  async getAccounts() {
    try {
      const response = await prisma.accounts.findMany();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(account) {
    try {
      const response = await prisma.accounts.create(account);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAccountById(id: string) {
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

  async updateAccount(id: string, data: any) {
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
