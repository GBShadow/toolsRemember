import { uuid } from 'uuidv4';

import IToolsRepository from '@modules/tools/repositories/IToolsRepository';

import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
import IFindByIdDTO from '@modules/tools/dtos/IFindByIdDTO';
import IFindByTitleDTO from '@modules/tools/dtos/IFindByTitleDTO';
import IFindByTagDTO from '@modules/tools/dtos/IFindByTagDTO';

import Tool from '../../infra/typeorm/entities/Tool';

class FakeToolsRepository implements IToolsRepository {
  private tools: Tool[] = [];

  public async create({
    user,
    title,
    link,
    description,
    tags,
  }: ICreateToolDTO): Promise<Tool> {
    const tool = new Tool();

    Object.assign(tool, {
      id: uuid(),
      user,
      title,
      link,
      description,
      tools_tags: tags,
    });

    this.tools.push(tool);

    return tool;
  }

  public async findAll(user_id: string): Promise<Tool[]> {
    const findAllToolsOfUser = this.tools.filter(
      tool => tool.user.id === user_id,
    );

    return findAllToolsOfUser;
  }

  public async findById({
    user_id,
    id,
  }: IFindByIdDTO): Promise<Tool | undefined> {
    const findTool = this.tools.find(tool => {
      return tool.user.id === user_id && tool.id === id;
    });

    return findTool;
  }

  public async findByTitle({
    user_id,
    title,
  }: IFindByTitleDTO): Promise<Tool | undefined> {
    const findTool = this.tools.find(tool => {
      return tool.user.id === user_id && tool.title === title;
    });

    return findTool;
  }

  public async findAllByTag({
    user_id,
    tagId,
  }: IFindByTagDTO): Promise<Tool[]> {
    const findToolsByTag = this.tools.filter(tool => {
      return (
        tool.user.id === user_id &&
        tool.tools_tags.find(tool_tag => tool_tag.tag_id === tagId)
      );
    });

    return findToolsByTag;
  }

  public async deleteTool(tool: Tool): Promise<void> {
    const indexTool = this.tools.findIndex(t => t === tool);

    this.tools.slice(1, indexTool);
  }
}

export default FakeToolsRepository;
