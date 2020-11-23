import { EntityRepository, Repository } from 'typeorm';
import Tool from '../model/Tool';

@EntityRepository(Tool)
class ToolRepository extends Repository<Tool> {
  public async findByTag(tag: string): Promise<Tool[] | null> {
    const findTools = await this.find({
      where: { tag },
    });

    return findTools || null;
  }
}

export default ToolRepository;
