import User from '../models/User';
import ICreateUserDTO from './ICreateUserDTO';

export default interface IToolsRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByTagId(user_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
