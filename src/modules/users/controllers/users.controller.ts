import { Request, Response } from 'express';

import { Service, Container } from 'typedi';
import { RegisterUserUseCase } from '../usecases/register.usecase';

@Service()
export class UsersController {
  async register(req: Request, res: Response): Promise<Response> {
    const registerUserUsecase = Container.get(RegisterUserUseCase);

    const { email, password } = req.body;

    const registeredUser = await registerUserUsecase.execute({
      email,
      password,
    });

    return res.status(200).json(registeredUser);
  }
}
