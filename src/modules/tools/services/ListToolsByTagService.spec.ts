import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeTagsRepository from '../repositories/fakes/FakeTagRepository';
import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import ListToolsByTagService from './ListToolsByTagService';
import CreateToolService from './CreateToolService';

let fakeToolRepository: FakeToolRepository;
let fakeUserRepository: FakeUsersRepository;
let fakeTagRepository: FakeTagsRepository;
let createUser: CreateUserService;
let createTool: CreateToolService;
let listToolsByTag: ListToolsByTagService;

describe('ListToolsByTagService', () => {
  beforeEach(() => {
    fakeToolRepository = new FakeToolRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeTagRepository = new FakeTagsRepository();

    listToolsByTag = new ListToolsByTagService(
      fakeToolRepository,
      fakeUserRepository,
      fakeTagRepository,
    );
    createUser = new CreateUserService(fakeUserRepository);
    createTool = new CreateToolService(
      fakeToolRepository,
      fakeUserRepository,
      fakeTagRepository,
    );
  });

  it('should be able to list tools with the same tag', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@john.com',
      password: '123456',
    });

    await createTool.execute({
      user_id: user.id,
      title: 'Visual Studio Code',
      link: 'vscode.com.br',
      description: 'A text editor',
      tags: ['Gui', 'Free', 'Text editor'],
    });

    const tool1 = await createTool.execute({
      user_id: user.id,
      title: 'Neovim',
      link: 'neovim.com.br',
      description: 'A simple text editor',
      tags: ['Terminal', 'Free', 'Text editor'],
    });

    const tool2 = await createTool.execute({
      user_id: user.id,
      title: 'Vim',
      link: 'vim.com.br',
      description: 'A simple text editor',
      tags: ['Terminal', 'Free', 'Text editor'],
    });

    expect(
      await listToolsByTag.execute({
        user_id: user.id,
        tag: 'Terminal',
      }),
    ).toMatchObject([tool1, tool2]);
  });

  it('should be able to list all tools without using a tag', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@john.com',
      password: '123456',
    });

    const tool1 = await createTool.execute({
      user_id: user.id,
      title: 'Neovim',
      link: 'neovim.com.br',
      description: 'A simple text editor',
      tags: ['Terminal', 'Free', 'Text editor'],
    });

    const tool2 = await createTool.execute({
      user_id: user.id,
      title: 'Vim',
      link: 'vim.com.br',
      description: 'A simple text editor',
      tags: ['Terminal', 'Free', 'Text editor'],
    });

    const tool3 = await createTool.execute({
      user_id: user.id,
      title: 'Visual Studio Code',
      link: 'vscode.com.br',
      description: 'A text editor',
      tags: ['Gui', 'Free', 'Text editor'],
    });

    expect(
      await listToolsByTag.execute({
        user_id: user.id,
      }),
    ).toMatchObject([tool1, tool2, tool3]);
  });

  it('should not be able to list tools with a invalid user', async () => {
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
      listToolsByTag.execute({
        user_id: 'invalid_user_id',
        tag: 'Terminal',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able a list tool if does not exist', async () => {
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
      listToolsByTag.execute({
        user_id: user.id,
        tag: 'invalid_tag',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
