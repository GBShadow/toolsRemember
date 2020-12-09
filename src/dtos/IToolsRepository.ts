import Tool from '../models/Tool';
import ICreateToolDTO from './ICreateToolDTO';

export default interface IToolsRepository {
  create(data: ICreateToolDTO): Promise<Tool>;
  findAll(): Promise<Tool[] | null>;
  findById(data: string): Promise<Tool | undefined>;
  findByTitle(title: string): Promise<Tool | undefined>;
  findAllByTagName(tag: string): Promise<Tool[] | null>;
}
