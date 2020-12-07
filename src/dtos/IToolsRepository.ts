import Tool from '../models/Tool';
import ICreateToolDTO from './ICreateToolDTO';

export default interface IToolsRepository {
  create(data: ICreateToolDTO): Promise<Tool>;
  findByTitle(title: string): Promise<Tool | undefined>;
  findAllByTagName(tag: string): Promise<Tool[] | null>;
}
