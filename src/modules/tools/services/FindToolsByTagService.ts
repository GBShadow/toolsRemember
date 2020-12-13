import AppError from '@shared/errors/AppError';
import Tool from '../infra/typeorm/entities/Tool';
import TagsRepository from '../infra/typeorm/repositories/TagsRepository';

import ToolsRepository from '../infra/typeorm/repositories/ToolsRepository';
import ITagsRepository from '../repositories/ITagsRepository';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  tag: string | null;
}

class FindToolService {
  private toolRepository: IToolsRepository;

  private tagRepository: ITagsRepository;

  constructor() {
    this.toolRepository = new ToolsRepository();

    this.tagRepository = new TagsRepository();
  }

  public async execute({ tag }: IRequest): Promise<Tool[]> {
    if (!tag) {
      const tools = await this.toolRepository.findAll();

      return tools;
    }

    const tagExist = await this.tagRepository.findByTitle(tag);

    if (!tagExist) {
      throw new AppError('Tag does not exist.');
    }

    const tools = await this.toolRepository.findAllByTag(tagExist.id);

    return tools;
  }
}

export default FindToolService;
