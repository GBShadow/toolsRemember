import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let createUser: CreateUserService;
let createAuthenticate: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUserRepository);
    createAuthenticate = new AuthenticateUserService(fakeUserRepository);
  });

  it('should be able to authenticate user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@john.com',
      password: '123456',
    });

    const authUser = await createAuthenticate.execute({
      email: user.email,
      password: '123456',
    });

    expect(authUser).toHaveProperty('token');
  });

  it('should not be able to authenticate user with invalid email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@john.com',
      password: '123456',
    });

    await expect(
      createAuthenticate.execute({
        email: 'invalid_email@john.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with invalid password', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@john.com',
      password: '123456',
    });

    await expect(
      createAuthenticate.execute({
        email: user.email,
        password: 'invalid_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
