import AppError from '@shared/errors/AppError';

import Tool from '../infra/typeorm/entities/Tool';

import ToolsRepository from '../infra/typeorm/repositories/ToolsRepository';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  id: string;
}

class FindToolService {
  private toolRepository: IToolsRepository;

  constructor() {
    this.toolRepository = new ToolsRepository();
  }

  public async execute({ id }: IRequest): Promise<Tool | undefined> {
    const tool = await this.toolRepository.findById(id);

    if (!tool) {
      throw new AppError('Tool does not exist.');
    }

    return tool;
  }
}

export default FindToolService;
