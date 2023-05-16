import { UserToken } from '@prisma/client';
import prisma from '@shared/infra/db-connectors/prisma';

import { IUsersTokensRepository } from '../interfaces/i-users-tokens.repository';
import { ICreateUserTokenProps } from '../props/i-create-token.props';

export class UsersTokensRepository implements IUsersTokensRepository {
  public async create({
    userId,
    expiresDate,
    refreshToken,
  }: ICreateUserTokenProps): Promise<UserToken> {
    return prisma.userToken.create({
      data: {
        user_id: userId,
        expires_at: expiresDate,
        refresh_token: refreshToken,
      },
    });
  }

  async findByUserIdAndRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<UserToken | null> {
    const userTokens = await prisma.userToken.findFirst({
      where: {
        user_id: userId,
        refresh_token: refreshToken,
      },
    });

    return userTokens;
  }

  async deleteById(id: number): Promise<void> {
    await prisma.userToken.delete({
      where: {
        id,
      },
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken | null> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });

    return userToken;
  }
}
