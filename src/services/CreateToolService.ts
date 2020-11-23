import { getCustomRepository } from 'typeorm';
import Tool from '../model/Tool';
import ToolRepository from '../repositories/ToolsRepository';

interface Request {
  title: string;
  link: string;
  description: string;
  tag: string;
}

class CreateToolService {
  public async execute({
    title,
    link,
    description,
    tag,
  }: Request): Promise<Tool> {
    const toolRepository = getCustomRepository(ToolRepository);

    const tool = toolRepository.create({
      title,
      link,
      description,
      tag,
    });

    await toolRepository.save(tool);

    return tool;
  }
}

export default CreateToolService;
