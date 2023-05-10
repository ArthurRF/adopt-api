import { Inject, Service } from 'typedi';
import { User } from '@prisma/client';
import { UsersRepository } from '../repositories/implementations/users.repository';

interface IProps {
  email: string;
  password: string;
}

@Service()
export class RegisterUserUseCase {
  constructor(
    @Inject()
    private usersRepository: UsersRepository
  ) {}

  async execute({ email, password }: IProps): Promise<User> {
    const userCreated = await this.usersRepository.create({
      email,
      password,
    });

    return userCreated;
  }
}
