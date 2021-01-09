import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Tool from '../infra/typeorm/entities/Tool';

import ITagsRepository from '../repositories/ITagsRepository';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  user_id: string;
  tag?: string;
}

class ListToolsByTagService {
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

  public async execute({ user_id, tag }: IRequest): Promise<Tool[]> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    if (!tag) {
      const tools = await this.toolRepository.findAll(user_id);

      return tools;
    }

    const tagExist = await this.tagRepository.findByTitle(tag);

    if (!tagExist) {
      throw new AppError('Tag does not exist.');
    }

    const tagId = tagExist.id;

    const tools = await this.toolRepository.findAllByTag({ user_id, tagId });

    return tools;
  }
}

export default ListToolsByTagService;
