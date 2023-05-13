import { UsersRepository } from '@modules/users/repositories/implementations/users.repository';
import { ICreateUserProps } from '@modules/users/repositories/props/i-create.props';
import { FindUserByEmailUseCase } from '../find-by-email.usecase';
import { RegisterUserUseCase } from '../register.usecase';

let usersRepository: UsersRepository;
let registerUserUseCase: RegisterUserUseCase;
let findUserByEmailUseCase: FindUserByEmailUseCase;

describe('FindUserByEmailUseCase', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    registerUserUseCase = new RegisterUserUseCase(usersRepository);
    findUserByEmailUseCase = new FindUserByEmailUseCase(usersRepository);
  });

  it('should be defined', () => {
    expect(findUserByEmailUseCase).toBeDefined();
  });

  it('should find an user with existent email', async () => {
    const user: ICreateUserProps = {
      email: 'rosalia@nitzsche.com',
      password: 'mockpass',
    };
    await registerUserUseCase.execute(user);

    const userFound = await findUserByEmailUseCase.execute({
      email: user.email,
    });

    expect(userFound).toHaveProperty('id');
  });

  it('should return null for email not registered', async () => {
    const userFound = await findUserByEmailUseCase.execute({
      email: 'dawn@lindgren.com',
    });

    expect(userFound).toEqual(null);
  });
});
