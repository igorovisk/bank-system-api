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
    const creditedAccountId = req.params.accountId;
    const debitedAccountId = req.body.debitedAccountId;

    const creditedAccount = await this.accountRepository.getAccountById(
      creditedAccountId,
    );

    const debitedAccount = await this.accountRepository.getAccountById(
      debitedAccountId,
    );

    const { amount } = req.body;

    if (!creditedAccount) {
      throw new Error('A conta a ser creditada é inexistente');
    }

    const transaction = {
      creditedAccountId: creditedAccount.id,
      debitedAccountId: debitedAccount.id,
      amount: Number(amount),
    };

    const response = await this.repository.create(transaction);
    return response;
  }

  async getTransactions(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<TransactionDTO[]> {
    const userAccountId = req.params.accountId;

    const userAccount = await this.accountRepository.getAccountById(
      userAccountId,
    );

    if (!userAccount) {
      throw new Error('Conta não encontrada');
    }
    const response = await this.repository.getTransactions(userAccount.id);
    console.log(response, 'ALL TRANSACTIONS');
    return response;
  }
}
