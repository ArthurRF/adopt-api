import { UserToken } from '@prisma/client';
import { ICreateUserTokenProps } from '../props/i-create-token.props';

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenProps): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<UserToken | null>;
  deleteById(id: number): Promise<void>;
  findByRefreshToken(refreshToken: string): Promise<UserToken | null>;
}
