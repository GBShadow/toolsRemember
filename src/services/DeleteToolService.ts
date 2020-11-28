import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import ToolsRepository from '../repositories/ToolsRepository';

class DeleteToolService {
  public async execute(id: string): Promise<void> {
    const toolRepository = getCustomRepository(ToolsRepository);

    const tool = await toolRepository.findOne(id);

    if (!tool) {
      throw new AppError('Tool does not exist');
    }

    await toolRepository.remove(tool);
  }
}

export default DeleteToolService;
