import { Service } from 'typedi';

@Service()
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
