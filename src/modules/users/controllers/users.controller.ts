import { inversifyContainer } from '@shared/infra/containers/inversify.config';
import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { RegisterUserUseCase } from '../usecases/register.usecase';

@injectable()
export class UsersController {
  async register(req: Request, res: Response): Promise<Response> {
    const registerUserUsecase = inversifyContainer.get(RegisterUserUseCase);

    const registeredUser = await registerUserUsecase.execute();

    return res.status(200).json(registeredUser);
  }
}
