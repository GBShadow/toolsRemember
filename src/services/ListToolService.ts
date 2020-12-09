import AppError from '../errors/AppError';

import Tool from '../models/Tool';

import ToolsRepository from '../repositories/ToolsRepository';
import IToolsRepository from '../dtos/IToolsRepository';

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
