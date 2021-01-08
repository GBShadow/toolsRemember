import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeTagsRepository from '../repositories/fakes/FakeTagRepository';
import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import DeleteToolService from './DeleteToolService';
import CreateToolService from './CreateToolService';

let fakeToolRepository: FakeToolRepository;
let fakeUserRepository: FakeUsersRepository;
let fakeTagRepository: FakeTagsRepository;
let createTool: CreateToolService;
let deleteTool: DeleteToolService;

describe('DeleteToolService', () => {
  beforeEach(() => {
    fakeToolRepository = new FakeToolRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeTagRepository = new FakeTagsRepository();

    deleteTool = new DeleteToolService(fakeToolRepository, fakeUserRepository);

    createTool = new CreateToolService(
      fakeToolRepository,
      fakeUserRepository,
      fakeTagRepository,
    );
  });

  it('should be able to delete a tool', async () => {
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

    await expect(
      deleteTool.execute({
        user_id: user.id,
        id: tool.id,
      }),
    ).toEqual(expect.objectContaining({}));
  });

  it('should not be able a delete tools with a invalid user', async () => {
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

    await expect(
      deleteTool.execute({
        user_id: 'invalid_user_id',
        id: tool.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able a delete tool if does not exist', async () => {
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
      deleteTool.execute({
        user_id: user.id,
        id: 'invalid_tool_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
