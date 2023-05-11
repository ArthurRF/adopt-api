import { User } from '@prisma/client';
import { prismaMock } from '@shared/infra/db-connectors/prisma-mock';
import { UsersRepository } from '@modules/users/repositories/implementations/users.repository';
import { RegisterUserUseCase } from '../register.usecase';

let usersRepository: UsersRepository;
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
    const currentDate = new Date();
    const user: User = {
      id: 1,
      email: 'john@doe.com',
      password: 'pass',
      created_at: currentDate,
      updated_at: currentDate,
    };

    prismaMock.user.create.mockResolvedValue(user);

    const userCreated = await registerUserUseCase.execute({
      email: 'john@doe.com',
      password: 'pass',
    });

    expect(userCreated).toEqual(user);
  });

  it('should not create a user with duplicated email', async () => {
    prismaMock.user.create.mockImplementationOnce(() => {
      throw new Error('duplicated key');
    });

    const createUserPromise = registerUserUseCase.execute({
      email: 'john@doe.com',
      password: 'pass',
    });

    await expect(createUserPromise).rejects.toThrow('duplicated key');
  });
});
