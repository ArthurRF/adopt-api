import app from '@shared/infra/http/app';
import request from 'supertest';
import { UsersRepository } from '@modules/users/repositories/implementations/users.repository';
import { RegisterUserUseCase } from '@modules/users/usecases/register.usecase';
import { IUsersRepository } from '@modules/users/repositories/interfaces/i-users.repository';
import { AuthenticateUserUseCase } from '@modules/users/usecases/authenticate.usecase';
import { IUsersTokensRepository } from '@modules/users/repositories/interfaces/i-users-tokens.repository';
import { UsersTokensRepository } from '@modules/users/repositories/implementations/users-tokens.repository';
import { RegisterUserDTO } from '../interfaces/i-register.dto';

const server = request(app);

let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let registerUserUseCase: RegisterUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Users Integration Tests (UsersController)', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    registerUserUseCase = new RegisterUserUseCase(usersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository
    );
  });

  describe('POST /users/register', () => {
    it('should return a list of pets', async () => {
      const newUser = {
        email: 'john@doe.com',
        password: 'mockPassword',
      } as (typeof RegisterUserDTO)['_type'];

      const response = await server.post('/users/register').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email', newUser.email);
      expect(response.body).toHaveProperty('password');
    });
  });

  describe('POST /users/login', () => {
    it('should be able to login an existent user', async () => {
      const mockUser = {
        email: 'mock@mail.com',
        password: 'mockPassword',
      } as (typeof RegisterUserDTO)['_type'];

      await registerUserUseCase.execute(mockUser);
      const response = await server.post('/users/login').send(mockUser);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('refreshToken');
      expect(response.body).toHaveProperty('user', { email: mockUser.email });
    });

    it('should not be able to login an unexistent user', async () => {
      const mockUser = {
        email: 'invalid@mail.com',
        password: 'invalidPass',
      } as (typeof RegisterUserDTO)['_type'];

      const response = await server.post('/users/login').send(mockUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty(
        'message',
        'Usuário não encontrado.'
      );
    });
  });

  describe('POST /users/refresh-token', () => {
    it('should be able to refresh a valid token', async () => {
      const mockUser = {
        email: 'mock@mail2.com',
        password: 'mockPassword',
      } as (typeof RegisterUserDTO)['_type'];

      await registerUserUseCase.execute(mockUser);
      const userAuthenticated = await authenticateUserUseCase.execute(mockUser);

      const response = await server
        .post('/users/refresh-token')
        .send({ token: userAuthenticated.refreshToken });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('refreshToken');
    });

    it('should not be able to refresh a nonexistent token', async () => {
      const response = await server.post('/users/refresh-token').send({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsImlhdCI6MTY4NzA0MjczNSwiZXhwIjoxNjg5NjM0NzM1LCJzdWIiOiIyNCJ9.Upx7NZK3rsAGg8JRkPktvfOqowGJnAylwG_8rV_J2mE',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty(
        'message',
        'Refresh token inexistente!'
      );
    });

    it('should not be able to refresh a jwt malformed jwt token', async () => {
      const response = await server.post('/users/refresh-token').send({
        token: 'invalidToken',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message', 'jwt malformed');
    });
  });
});
