import { UsersRepository } from '@modules/users/repositories/implementations/users.repository';
import { UsersTokensRepository } from '@modules/users/repositories/implementations/users-tokens.repository';
import { IUsersRepository } from '@modules/users/repositories/interfaces/i-users.repository';
import { IUsersTokensRepository } from '@modules/users/repositories/interfaces/i-users-tokens.repository';
import { ICreateUserProps } from '@modules/users/repositories/props/i-create.props';
import { AppError } from '@shared/errors/app.error';
import { RegisterUserUseCase } from '../register.usecase';
import { AuthenticateUserUseCase } from '../authenticate.usecase';

let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let registerUserUseCase: RegisterUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository
    );
    registerUserUseCase = new RegisterUserUseCase(usersRepository);
  });

  it('should be defined', () => {
    expect(authenticateUserUseCase).toBeDefined();
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserProps = {
      email: 'taurean@halvorson.com',
      password: 'mockpass',
    };

    await registerUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a non existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: 'wrong pass',
      })
    ).rejects.toEqual(new AppError('Usuário não encontrado.'));
  });

  it('should not be able to authenticate an user with incorrect password', async () => {
    const user: ICreateUserProps = {
      email: 'rhiannon@trantow.com',
      password: 'mockpass',
    };
    await registerUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect',
      })
    ).rejects.toEqual(new AppError('E-mail ou senha incorretos.'));
  });
});
