import { ListPetsUseCase } from '../list.usecase';

let listPetsUseCase: ListPetsUseCase;

describe('ListPetsUseCase', () => {
  beforeEach(() => {
    listPetsUseCase = new ListPetsUseCase();
  });

  it('should be defined', () => {
    expect(listPetsUseCase).toBeDefined();
  });
});
