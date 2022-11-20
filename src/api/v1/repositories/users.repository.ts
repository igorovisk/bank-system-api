import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class UserRepository {
  async getUsers() {
    try {
      const response = await prisma.users.findMany();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(user) {
    try {
      const response = await prisma.users.create(user);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          username,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await prisma.users.delete({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, data: any) {
    try {
      const user = await prisma.users.update({
        where: {
          id,
        },
        data,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
