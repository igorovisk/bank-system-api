import { TransactionDTO } from '../dtos/transaction.dto';
import { TransactionRepository } from '../repositories/transactions.repository';
import { AccountRepository } from '../repositories';
import { Request, Response, NextFunction } from 'express';

export class TransactionLogic {
  private repository: TransactionRepository;
  private accountRepository: AccountRepository;

  constructor() {
    this.repository = new TransactionRepository();
    this.accountRepository = new AccountRepository();
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<TransactionDTO> {
    const creditedAccountId = req.params.id;
    const debitedAccountId = req.body.debitedAccountId;

    const creditedAccount = await this.accountRepository.getAccountById(
      creditedAccountId,
    );
    const debitedAccount = await this.accountRepository.getAccountById(
      creditedAccountId,
    );

    const { amount } = req.body;
    const transaction = {
      creditedAccountId,
      debitedAccountId,
      amount: amount,
    };
    const response = await this.repository.create({ data: transaction });
    return response;
  }
}
