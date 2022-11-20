import { UserRepository } from '../repositories';
const bcrypt = require('bcrypt');

export class AuthLogic {
  private userRepository: UserRepository;
  public static invalidCredentialsErrMsg =
    'Credenciais inválidas ou usuário inexistente';
  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(username: string, password: string): Promise<[]> {
    try {
      const user = await this.userRepository.getUserByUsername(username);
      if (!user) {
        throw new Error(AuthLogic.invalidCredentialsErrMsg);
      }

      const decryptedUserPassword = await bcrypt.compare(
        password,
        user?.password,
      );

      if (!decryptedUserPassword) {
        throw new Error(AuthLogic.invalidCredentialsErrMsg);
      }

      return [];
    } catch (error) {
      throw error;
    }
  }
}
