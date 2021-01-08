import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeTagsRepository from '../repositories/fakes/FakeTagRepository';
import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import CreateToolService from './CreateToolService';

let fakeToolRepository: FakeToolRepository;
let fakeUserRepository: FakeUsersRepository;
let fakeTagRepository: FakeTagsRepository;
let createTool: CreateToolService;

describe('CreateToolService', () => {
  beforeEach(() => {
    fakeToolRepository = new FakeToolRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeTagRepository = new FakeTagsRepository();
    createTool = new CreateToolService(
      fakeToolRepository,
      fakeUserRepository,
      fakeTagRepository,
    );
  });

  it('should be able to create a new tool', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@john.com',
      password: '123456',
    });

    const tool = await createTool.execute({
      user_id: user.id,
      title: 'Neovim',
      link: 'neovim.com.br',
      description: 'A simple text editor',
      tags: ['Terminal', 'Free', 'Text editor'],
    });

    expect(tool).toHaveProperty('id');
  });

  it('should not be able a create two tools with same title', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@john.com',
      password: '123456',
    });

    await createTool.execute({
      user_id: user.id,
      title: 'Neovim',
      link: 'neovim.com.br',
      description: 'A simple text editor',
      tags: ['Terminal', 'Free', 'Text editor'],
    });

    await expect(
      createTool.execute({
        user_id: user.id,
        title: 'Neovim',
        link: 'neovim.com.br',
        description: 'A simple text editor',
        tags: ['Terminal', 'Free', 'Text editor'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able a create tools with a invalid user', async () => {
    await expect(
      createTool.execute({
        user_id: 'invalid_user_id',
        title: 'Neovim',
        link: 'neovim.com.br',
        description: 'A simple text editor',
        tags: ['Terminal', 'Free', 'Text editor'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
