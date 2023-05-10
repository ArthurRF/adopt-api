import { RegisterUserUseCase } from '../register.usecase';

let registerUserUsecase: RegisterUserUseCase;

describe('RegisterUserUseCase', () => {
  beforeEach(() => {
    registerUserUsecase = new RegisterUserUseCase({
      create: jest.fn(),
    });
  });

  it('should be defined', () => {
    expect(registerUserUsecase).toBeDefined();
  });
});
