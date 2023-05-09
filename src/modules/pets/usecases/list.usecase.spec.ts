import { ListPetsUseCase } from './list.usecase';

let listPetsUseCase: ListPetsUseCase;

describe('ListPetsUseCase', () => {
  beforeEach(() => {
    listPetsUseCase = new ListPetsUseCase();
  });

  it('Should be defined', () => {
    expect(listPetsUseCase).toBeDefined();
  });
});
