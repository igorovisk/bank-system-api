import { UserRepository } from '../repositories';
import { JwtTokenUtils } from '../../../utils';
import { IJwtClient } from '../interfaces/Itoken';
const bcrypt = require('bcrypt');

export class AuthLogic {
  private userRepository: UserRepository;

  public static invalidCredentialsErrMsg =
    'Credenciais inválidas ou usuário inexistente';

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(username: string, password: string): Promise<string> {
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
      const token = JwtTokenUtils.createToken({
        user: { ...user },
        auth: true,
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
}
