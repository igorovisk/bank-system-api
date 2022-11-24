import { PrismaClient } from '@prisma/client';
import { TransactionDTO } from '../dtos/transaction.dto';
import { TransactionInterface } from '../interfaces/transaction.interface';
const prisma = new PrismaClient();

export class TransactionRepository {
  async create(transaction: TransactionInterface): Promise<TransactionDTO> {
    try {
      const response = await prisma.transactions.create({
        data: transaction,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getTransactions(accountId: string): Promise<TransactionDTO[]> {
    try {
      const transactions = await prisma.transactions.findMany({
        where: {
          OR: [
            { creditedAccountId: accountId },
            { debitedAccountId: accountId },
          ],
        },
      });

      return transactions;
    } catch (error) {
      console.error(error);
    }
  }
}
