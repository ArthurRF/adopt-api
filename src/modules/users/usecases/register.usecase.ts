import { AppError } from '@shared/errors/app.error';
import { Inject, Service } from 'typedi';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { IUsersRepository } from '../repositories/interfaces/i-users.repository';

interface IProps {
  email: string;
  password: string;
}

@Service()
export class RegisterUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IProps): Promise<User> {
    const userAlreadyRegistered = await this.usersRepository.findByEmail(email);

    if (userAlreadyRegistered) {
      throw new AppError('E-mail já registrado.');
    }

    const passwordHash = await hash(password, 8);

    const userCreated = await this.usersRepository.create({
      email,
      password: passwordHash,
    });

    return userCreated;
  }
}
