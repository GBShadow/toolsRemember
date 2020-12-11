import AppError from '../../shared/errors/AppError';

import Tool from '../infra/typeorm/entities/Tool';

import ToolsRepository from '../infra/typeorm/repositories/ToolsRepository';
import UsersRepository from '../../users/infra/typeorm/repositories/UsersRepository';
import TagsRepository from '../infra/typeorm/repositories/TagsRepository';

import IToolsRepository from '../repositories/IToolsRepository';
import ITagsRepository from '../../../../src2/dtos/ITagsRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

interface ITags {
  title: string;
}

interface IRequest {
  user_id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

class CreateToolService {
  private toolRepository: IToolsRepository;

  private userRepository: IUsersRepository;

  private tagRepository: ITagsRepository;

  constructor() {
    this.toolRepository = new ToolsRepository();

    this.userRepository = new UsersRepository();

    this.tagRepository = new TagsRepository();
  }

  public async execute({
    user_id,
    title,
    link,
    description,
    tags,
  }: IRequest): Promise<Tool> {
    const user = await this.userRepository.findByTagId(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const alreadyExistTool = await this.toolRepository.findByTitle(title);

    if (alreadyExistTool) {
      throw new AppError('Tool already exist');
    }

    const savedTags = await this.tagRepository.create(tags);

    const tagsId = savedTags.map(tag => ({
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
