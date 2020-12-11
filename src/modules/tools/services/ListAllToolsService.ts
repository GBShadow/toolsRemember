import AppError from '@shared/errors/AppError';

import Tool from '../infra/typeorm/entities/Tool';

import ToolsRepository from '../infra/typeorm/repositories/ToolsRepository';
import IToolsRepository from '../repositories/IToolsRepository';

class ListToolService {
  private toolRepository: IToolsRepository;

  constructor() {
    this.toolRepository = new ToolsRepository();
  }

  public async execute(): Promise<Tool[] | null> {
    const tools = await this.toolRepository.findAll();

    return tools;
  }
}

export default ListToolService;
