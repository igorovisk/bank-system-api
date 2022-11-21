import { PrismaClient } from '@prisma/client';
import { TransactionDTO } from '../dtos/transaction.dto';
const prisma = new PrismaClient();

export class TransactionRepository {

  async create(TransactionDTO) {
    try {
      console.log(TransactionDTO, 'TRANSACTION DTO')
      const response = await prisma.transactions.create(TransactionDTO);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
