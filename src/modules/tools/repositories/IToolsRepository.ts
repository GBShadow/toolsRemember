import Tool from '../infra/typeorm/entities/Tool';
import ICreateToolDTO from '../dtos/ICreateToolDTO';
import IFindDTO from '../dtos/IFindByIdDTO';
import IFindByTitleDTO from '../dtos/IFindByTitleDTO';
import IFindByTagDTO from '../dtos/IFindByTagDTO';

export default interface IToolsRepository {
  create(data: ICreateToolDTO): Promise<Tool>;
  findAll(user_id: string): Promise<Tool[]>;
  findById(data: IFindDTO): Promise<Tool | undefined>;
  findByTitle(data: IFindByTitleDTO): Promise<Tool | undefined>;
  findAllByTag(data: IFindByTagDTO): Promise<Tool[]>;
  deleteTool(data: Tool): Promise<void>;
}
