import AppError from '@shared/errors/AppError';

import Tool from '../infra/typeorm/entities/Tool';

import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  user_id: string;
  id: string;
}

class FindToolService {
  private toolRepository: IToolsRepository;

  constructor(toolRepository: IToolsRepository) {
    this.toolRepository = toolRepository;
  }

  public async execute({ user_id, id }: IRequest): Promise<Tool | undefined> {
    const tool = await this.toolRepository.findById({ user_id, id });

    if (!tool) {
      throw new AppError('Tool does not exist.');
    }

    return tool;
  }
}

export default FindToolService;
