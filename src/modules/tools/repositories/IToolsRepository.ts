import Tool from '../infra/typeorm/entities/Tool';
import ICreateToolDTO from '../dtos/ICreateToolDTO';

export default interface IToolsRepository {
  create(data: ICreateToolDTO): Promise<Tool>;
  findAll(): Promise<Tool[]>;
  findById(data: string): Promise<Tool | undefined>;
  findByTitle(title: string): Promise<Tool | undefined>;
  findAllByTag(tagId: string): Promise<Tool[]>;
  deleteTool(data: Tool): Promise<void>;
}
