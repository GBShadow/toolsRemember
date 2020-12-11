import AppError from '@shared/errors/AppError';

import Tool from '../infra/typeorm/entities/Tool';

import ToolsRepository from '../infra/typeorm/repositories/ToolsRepository';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  tag: string;
}

class FindToolService {
  private toolRepository: IToolsRepository;

  constructor() {
    this.toolRepository = new ToolsRepository();
  }

  public async execute({ tag }: IRequest): Promise<Tool[] | null> {
    const tools = await this.toolRepository.findAllByTagName(tag);

    return tools || null;
  }
}

export default FindToolService;
