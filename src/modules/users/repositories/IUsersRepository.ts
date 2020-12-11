import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IToolsRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByTagId(user_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
