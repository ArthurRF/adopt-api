import { Request, Response } from 'express';

import { Service, Container } from 'typedi';
import { AppError } from '@shared/errors/app.error';
import { RegisterUserUseCase } from '../usecases/register.usecase';
import { RegisterUserDTO } from './interfaces/i-register.dto';

@Service()
export class UsersController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const registerUserUsecase = Container.get(RegisterUserUseCase);

      const { email, password } = RegisterUserDTO.parse(req.body);

      const registeredUser = await registerUserUsecase.execute({
        email,
        password,
      });

      return res.status(200).json(registeredUser);
    } catch (error: any) {
      if (error?.message) {
        throw new AppError(error?.message);
      }
      throw error;
    }
  }
}
