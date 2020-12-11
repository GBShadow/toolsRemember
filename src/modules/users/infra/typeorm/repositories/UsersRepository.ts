import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepositoty: Repository<User>;

  constructor() {
    this.ormRepositoty = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepositoty.create({
      name,
      email,
      password,
    });

    await this.ormRepositoty.save(user);

    return user;
  }

  public async findByTagId(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepositoty.findOne({
      where: {
        id: user_id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepositoty.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export default UsersRepository;
