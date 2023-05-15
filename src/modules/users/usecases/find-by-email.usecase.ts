import { Inject, Service } from 'typedi';
import { User } from '@prisma/client';
import { IUsersRepository } from '../repositories/interfaces/i-users.repository';

interface IProps {
  email: string;
}

@Service()
export class FindUserByEmailUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email }: IProps): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }
}
