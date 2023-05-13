import { UserToken } from '@prisma/client';
import { ICreateUserTokenProps } from './props/i-create-token.props';

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenProps): Promise<UserToken>;
}
