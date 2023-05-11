import { User } from '@prisma/client';
import { prismaMock } from '@shared/infra/db-connectors/prisma-mock';
import { UsersRepository } from '@modules/users/repositories/implementations/users.repository';
import { FindUserByEmailUseCase } from '../find-by-email.usecase';

let usersRepository: UsersRepository;
let findUserByEmailUseCase: FindUserByEmailUseCase;

describe('FindUserByEmailUseCase', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    findUserByEmailUseCase = new FindUserByEmailUseCase(usersRepository);
  });

  it('should be defined', () => {
    expect(findUserByEmailUseCase).toBeDefined();
  });

  it('should find an user with existent email', async () => {
    const currentDate = new Date();
    const user: User = {
      id: 1,
      email: 'john@doe.com',
      password: 'pass',
      created_at: currentDate,
      updated_at: currentDate,
    };

    prismaMock.user.findUnique.mockResolvedValue(user);

    const userFound = await findUserByEmailUseCase.execute({
      email: 'john@doe.com',
    });

    expect(userFound).toEqual({
      id: 1,
      email: 'john@doe.com',
      password: 'pass',
      created_at: currentDate,
      updated_at: currentDate,
    });
  });

  it('should return null for email not registered', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const userFound = await findUserByEmailUseCase.execute({
      email: 'john@doe.com',
    });

    expect(userFound).toEqual(null);
  });
});
