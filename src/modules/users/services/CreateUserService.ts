import AppError from '../../shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository: IUsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  public async execute({ name, email, password }: Request): Promise<User> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError('User already exist');
    }

    const user = this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
