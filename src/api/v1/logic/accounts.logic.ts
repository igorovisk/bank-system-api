import { AccountRepository } from '../repositories';
import { AccountDTO } from '../dtos';

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

  async create(dto: AccountDTO): Promise<AccountDTO> {
    try {
      delete dto['_originalData'];
      const response = await this.repository.create({ data: dto });
      return response;
    } catch (error) {
      throw error;
    }
  }

  //   async getUserById(id: string): Promise<AccountDTO> {
  //     try {
  //       const response = await this.repository.getUserById(id);
  //       return response;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  async updateAccount(id: string, data: any): Promise<AccountDTO> {
    try {
      const response = await this.repository.updateAccount(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
