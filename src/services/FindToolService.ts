import AppError from '../errors/AppError';

import Tool from '../models/Tool';

import ToolsRepository from '../repositories/ToolsRepository';
import IToolsRepository from '../dtos/IToolsRepository';

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

    return tool;
  }
}

export default FindToolService;
