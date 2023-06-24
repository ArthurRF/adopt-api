import { UsersRepository } from '@modules/users/repositories/implementations/users.repository';
import { UsersTokensRepository } from '@modules/users/repositories/implementations/users-tokens.repository';
import { IUsersRepository } from '@modules/users/repositories/interfaces/i-users.repository';
import { IUsersTokensRepository } from '@modules/users/repositories/interfaces/i-users-tokens.repository';
import { ICreateUserProps } from '@modules/users/repositories/props/i-create.props';
import { AppError } from '@shared/errors/app.error';
import { RegisterUserUseCase } from '../register.usecase';
import { AuthenticateUserUseCase } from '../authenticate.usecase';
import { RefreshUserTokenUseCase } from '../refresh-token.usecase';

let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let registerUserUseCase: RegisterUserUseCase;
let refreshUserTokenUseCase: RefreshUserTokenUseCase;

describe('RefreshUserTokenUseCase', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository
    );
    registerUserUseCase = new RegisterUserUseCase(usersRepository);
    refreshUserTokenUseCase = new RefreshUserTokenUseCase(
      usersTokensRepository
    );
  });

  it('should be defined', () => {
    expect(refreshUserTokenUseCase).toBeDefined();
  });

  it('should be able to refresh a token', async () => {
    const user: ICreateUserProps = {
      email: 'jakayla@champlin.com',
      password: 'mockpass',
    };

    await registerUserUseCase.execute(user);

    const userAuthenticated = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const refreshedToken = await refreshUserTokenUseCase.execute(
      userAuthenticated.refreshToken
    );

    expect(refreshedToken).toHaveProperty('refreshToken');
    expect(refreshedToken.refreshToken).not.toEqual(
      userAuthenticated.refreshToken
    );
  });

  it('should not be able to refresh an invalid token', async () => {
    await expect(
      refreshUserTokenUseCase.execute('invalid token')
    ).rejects.toEqual(new AppError('JWT com formato inválido ou expirado.'));
  });

  it('should not be able to refresh a valid token that is expired', async () => {
    const mockExpiredJwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsImlhdCI6MTY4NDE5OTQ5OSwiZXhwIjoxNjg0MTk5NTI5LCJzdWIiOiIyNCJ9.nH_4StkwuUU_YvdwnnOKGUlLxKRSn9pGtCzXbp6vIvE';
    await expect(
      refreshUserTokenUseCase.execute(mockExpiredJwt)
    ).rejects.toEqual(new AppError('JWT com formato inválido ou expirado.'));
  });

  it('should not be able to refresh a valid token that does not exists', async () => {
    const mockInexistentJwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsImlhdCI6MTY4NDE5NzE0MiwiZXhwIjo5OTk5OTk5OTk5OTksInN1YiI6IjIzIn0.UklB6tiQcY4ipzKk6fwXkNvEila9aMdkjeOI8v56K3A';
    await expect(
      refreshUserTokenUseCase.execute(mockInexistentJwt)
    ).rejects.toEqual(new AppError('Refresh token inexistente!'));
  });
});
