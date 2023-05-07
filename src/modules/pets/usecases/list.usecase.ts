import { injectable } from 'inversify';

@injectable()
export class ListPetsUseCase {
  async execute(): Promise<any> {
    return [
      {
        id: 1,
        name: 'floquinho',
        sexing: 'M',
      },
    ];
  }
}
