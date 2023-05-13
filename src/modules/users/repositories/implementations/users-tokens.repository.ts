import { UserToken } from '@prisma/client';
import prisma from '@shared/infra/db-connectors/prisma';
import { Service } from 'typedi';

import { IUsersTokensRepository } from '../interfaces/i-users-tokens.repository';
import { ICreateUserTokenProps } from '../props/i-create-token.props';

@Service({ transient: false })
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
}
