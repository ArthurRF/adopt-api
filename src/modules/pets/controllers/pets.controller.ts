import { Request, Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export class PetsController {
  async list(req: Request, res: Response): Promise<Response> {
    return res.send([
      {
        id: 1,
        name: 'Floquinho',
      },
    ]);
  }
}
