import { User } from '@prisma/client';
import { ICreateUserProps } from './props/i-create.props';

export interface IUsersRepository {
  create(data: ICreateUserProps): Promise<User>;
}
