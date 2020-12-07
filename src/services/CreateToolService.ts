import AppError from '../errors/AppError';

import Tool from '../models/Tool';

import ToolsRepository from '../repositories/ToolsRepository';
import UsersRepository from '../repositories/UsersRepository';
import TagsRepository from '../repositories/TagsRepository';

import IToolsRepository from '../dtos/IToolsRepository';
import ITagsRepository from '../dtos/ITagsRepository';
import IUsersRepository from '../dtos/IUsersRepository';

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

    const tagsId = savedTags.map(tag => tag.id);

    const tool = await this.toolRepository.create({
      user,
      title,
      link,
      description,
      tools_tags: tagsId,
    });

    return tool;
  }
}

export default CreateToolService;
