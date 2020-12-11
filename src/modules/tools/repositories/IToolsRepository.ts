import Tool from '../infra/typeorm/entities/Tool';
import ICreateToolDTO from '../dtos/ICreateToolDTO';

export default interface IToolsRepository {
  create(data: ICreateToolDTO): Promise<Tool>;
  findAll(): Promise<Tool[] | null>;
  findById(data: string): Promise<Tool | undefined>;
  findByTitle(title: string): Promise<Tool | undefined>;
  findAllByTagName(tagTitle: string): Promise<Tool[] | null>;
  deleteTool(data: Tool): Promise<void>;
}
