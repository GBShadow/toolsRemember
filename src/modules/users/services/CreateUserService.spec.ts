import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUserRepository);
  });

  it('should be able to create a new tool', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@john.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able a create two users with same email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@john.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@john.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
