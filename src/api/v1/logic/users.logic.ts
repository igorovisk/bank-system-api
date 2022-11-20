import { UserRepository } from '../repositories';
import { UserDTO } from '../dtos';

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

  async create(dto: UserDTO): Promise<UserDTO> {
    try {
      const userExists = await this.repository.getUserByUsername(dto.username);
      if (userExists) {
        return null;
      }
      delete dto['_originalData'];

      const response = await this.repository.create({ data: dto });
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
