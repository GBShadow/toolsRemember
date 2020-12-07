import { EntityRepository, Repository, getRepository } from 'typeorm';
import ICreateToolDTO from '../dtos/ICreateToolDTO';
import IToolsRepository from '../dtos/IToolsRepository';
import Tool from '../models/Tool';

@EntityRepository(Tool)
class ToolsRepository implements IToolsRepository {
  private ormRepositoty: Repository<Tool>;

  constructor() {
    this.ormRepositoty = getRepository(Tool);
  }

  public async create({
    user,
    title,
    link,
    description,
    tags,
  }: ICreateToolDTO): Promise<Tool> {
    const tool = this.ormRepositoty.create({
      user_id: user,
      title,
      link,
      description,
      tags_id: tags,
    });

    await this.ormRepositoty.save(tool);

    return tool;
  }

  public async findByTitle(title: string): Promise<Tool | undefined> {
    const tool = await this.ormRepositoty.findOne({
      where: {
        title,
      },
    });

    return tool;
  }

  public async findAllByTagName(tag_id: string): Promise<Tool[] | null> {
    const tags = await this.ormRepositoty.find({
      where: {
        tools_tags: tag_id,
      },
    });

    return tags || null;
  }
}

export default ToolsRepository;
