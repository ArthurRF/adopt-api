import { Inject, Service } from 'typedi';
import { User } from '@prisma/client';
import { UsersRepository } from '../repositories/implementations/users.repository';

interface IProps {
  email: string;
}

@Service()
export class FindUserByEmailUseCase {
  constructor(
    @Inject()
    private usersRepository: UsersRepository
  ) {}

  async execute({ email }: IProps): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }
}
