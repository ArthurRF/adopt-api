import { User } from '@prisma/client';
import prisma from '@shared/infra/db-connectors/prisma';

import { IUsersRepository } from '../interfaces/i-users.repository';
import { ICreateUserProps } from '../props/i-create.props';

export class UsersRepository implements IUsersRepository {
  public async create({ email, password }: ICreateUserProps): Promise<User> {
    return prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
