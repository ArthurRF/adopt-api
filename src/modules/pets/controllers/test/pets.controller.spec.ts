import { PetsController } from '../pets.controller';

let petsController: PetsController;

describe('PetsController', () => {
  beforeEach(() => {
    petsController = new PetsController();
  });

  it('should be defined', () => {
    expect(petsController).toBeDefined();
  });
});
