export interface TransactionDTO {
  id: string;
  amount: number;
  creditedAccountId: string;
  debitedAccountId: string;
  createdAt: Date;
}
