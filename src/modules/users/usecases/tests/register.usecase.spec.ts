import { UsersRepository } from '@modules/users/repositories/implementations/users.repository';
import { IUsersRepository } from '@modules/users/repositories/interfaces/i-users.repository';
import { AppError } from '@shared/errors/app.error';
import { RegisterUserUseCase } from '../register.usecase';

let usersRepository: IUsersRepository;
let registerUserUseCase: RegisterUserUseCase;

describe('RegisterUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    registerUserUseCase = new RegisterUserUseCase(usersRepository);
  });

  it('should be defined', () => {
    expect(registerUserUseCase).toBeDefined();
  });

  it('should create a new user', async () => {
    const userCreated = await registerUserUseCase.execute({
      email: 'steve@blick.com',
      password: 'mockpass',
    });

    expect(userCreated).toHaveProperty('id');
  });

  it('should not create a user with duplicated email', async () => {
    const emailMock = 'elsie@lueilwitz.com';
    await registerUserUseCase.execute({
      email: emailMock,
      password: 'mockpass',
    });

    await expect(
      registerUserUseCase.execute({
        email: emailMock,
        password: 'aleatorypass',
      })
    ).rejects.toEqual(new AppError('E-mail já registrado.'));
  });
});
