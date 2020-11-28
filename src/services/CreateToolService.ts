import { getCustomRepository, getRepository } from 'typeorm';
import Tool from '../models/Tool';
import Tag from '../models/Tag';
import ToolRepository from '../repositories/ToolsRepository';

interface Request {
  title: string;
  link: string;
  description: string;
  tag: string;
  user_id: string;
}

class CreateToolService {
  public async execute({
    title,
    link,
    description,
    tag,
    user_id,
  }: Request): Promise<Tool> {
    const toolRepository = getCustomRepository(ToolRepository);
    const tagRepository = getRepository(Tag);

    let toolTag = await tagRepository.findOne({
      where: {
        title: tag,
      },
    });

    if (!toolTag) {
      toolTag = tagRepository.create({
        title: tag,
      });

      await tagRepository.save(toolTag);
    }

    const tool = toolRepository.create({
      title,
      link,
      description,
      tag: toolTag,
      user_id,
    });

    await toolRepository.save(tool);

    return tool;
  }
}

export default CreateToolService;
