import { UsersController } from '../users.controller';

let usersController: UsersController;

describe('UsersController', () => {
  beforeEach(() => {
    usersController = new UsersController();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
