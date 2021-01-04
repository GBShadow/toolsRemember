import AppError from '@shared/errors/AppError';
import Tool from '../infra/typeorm/entities/Tool';

import ITagsRepository from '../repositories/ITagsRepository';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  user_id: string;
  tag: string | null;
}

class FindToolService {
  private toolRepository;

  private tagRepository;

  constructor(
    toolRepository: IToolsRepository,
    tagRepository: ITagsRepository,
  ) {
    this.toolRepository = toolRepository;

    this.tagRepository = tagRepository;
  }

  public async execute({ user_id, tag }: IRequest): Promise<Tool[]> {
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

export default FindToolService;
