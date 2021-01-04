import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IToolsRepository from '../repositories/IToolsRepository';
import ITagsRepository from '../repositories/ITagsRepository';

import Tool from '../infra/typeorm/entities/Tool';

interface IRequest {
  user_id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

class CreateToolService {
  private toolRepository;

  private userRepository;

  private tagRepository;

  constructor(
    toolRepository: IToolsRepository,
    userRepository: IUsersRepository,
    tagRepository: ITagsRepository,
  ) {
    this.toolRepository = toolRepository;

    this.userRepository = userRepository;

    this.tagRepository = tagRepository;
  }

  public async execute({
    user_id,
    title,
    link,
    description,
    tags,
  }: IRequest): Promise<Tool> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const alreadyExistTool = await this.toolRepository.findByTitle({
      user_id,
      title,
    });

    if (alreadyExistTool) {
      throw new AppError('Tool already exist');
    }

    const existentTags = await this.tagRepository.findAllByTitle(tags);

    const existentTagsTitle = existentTags.map(tag => tag.title);

    const inexistentTags = tags.filter(
      tag => !existentTagsTitle.find(tagTitle => tagTitle === tag),
    );

    const newTags = await this.tagRepository.create(inexistentTags);

    const newListTags = [...existentTags, ...newTags];

    const tagsId = newListTags.map(tag => ({
      tag_id: tag.id,
    }));

    const tool = await this.toolRepository.create({
      user,
      title,
      link,
      description,
      tags: tagsId,
    });

    return tool;
  }
}

export default CreateToolService;
