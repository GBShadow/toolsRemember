import { EntityRepository, Repository, getRepository } from 'typeorm';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import ICreateToolDTO from '../../../dtos/ICreateToolDTO';
import Tool from '../entities/Tool';

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
      user,
      title,
      link,
      description,
      tools_tags: tags,
    });

    await this.ormRepositoty.save(tool);

    return tool;
  }

  public async findAll(): Promise<Tool[]> {
    const tools = await this.ormRepositoty.find({
      relations: ['tools_tags', 'tools_tags.tag', 'user'],
    });

    return tools;
  }

  public async findById(id: string): Promise<Tool | undefined> {
    const tool = await this.ormRepositoty.findOne(id, {
      relations: ['tools_tags', 'tools_tags.tag', 'user'],
    });

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

  public async findAllByTag(tagId: string): Promise<Tool[]> {
    const tools = await this.ormRepositoty.find({
      relations: ['tools_tags', 'tools_tags.tag'],
    });

    const filteredTools = tools.filter(({ tools_tags }) =>
      tools_tags.find(({ tag_id }) => tag_id === tagId),
    );

    return filteredTools;
  }

  public async deleteTool(tool: Tool): Promise<void> {
    await this.ormRepositoty.remove(tool);
  }
}

export default ToolsRepository;
