export interface UserDTO {
  id?: string;
  username: string;
  fullname?: string;
  email?: string;
  cpf?: string;
  password?: string;
  accountId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  account?: IAccount;
}
