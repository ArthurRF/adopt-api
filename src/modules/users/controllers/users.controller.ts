import { Request, Response } from 'express';

import { Service, Container } from 'typedi';
import { AppError } from '@shared/errors/app.error';
import { RegisterUserUseCase } from '../usecases/register.usecase';
import { RegisterUserDTO } from './interfaces/i-register.dto';
import { AuthenticateUserUseCase } from '../usecases/authenticate.usecase';
import { RefreshUserTokenUseCase } from '../usecases/refresh-token.usecase';

@Service()
export class UsersController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const registerUserUseCase = Container.get(RegisterUserUseCase);

      const body = RegisterUserDTO.parse(req.body);

      const registeredUser = await registerUserUseCase.execute(body);

      return res.status(200).json(registeredUser);
    } catch (error: any) {
      if (error?.message) {
        throw new AppError(error?.message);
      }
      throw error;
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const authenticateUserUseCase = Container.get(AuthenticateUserUseCase);

      const body = RegisterUserDTO.parse(req.body);

      const authenticatedUser = await authenticateUserUseCase.execute(body);

      return res.status(200).json(authenticatedUser);
    } catch (error: any) {
      if (error?.message) {
        throw new AppError(error?.message);
      }
      throw error;
    }
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const refreshUserTokenUseCase = Container.get(RefreshUserTokenUseCase);

      const token =
        req.body.token || req.headers['x-access-token'] || req.query.token;

      const refresh_token = await refreshUserTokenUseCase.execute(token);

      return res.json(refresh_token);
    } catch (error: any) {
      if (error?.message) {
        throw new AppError(error?.message);
      }
      throw error;
    }
  }
}
