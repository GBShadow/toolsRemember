import AppError from '@shared/errors/AppError';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IToolsRepository from '../repositories/IToolsRepository';

import Tool from '../infra/typeorm/entities/Tool';

interface IRequest {
  user_id: string;
  id: string;
}

class FindToolService {
  private toolRepository;

  private userRepository;

  constructor(
    toolRepository: IToolsRepository,
    userRepository: IUserRepository,
  ) {
    this.toolRepository = toolRepository;
    this.userRepository = userRepository;
  }

  public async execute({ user_id, id }: IRequest): Promise<Tool | undefined> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const tool = await this.toolRepository.findById({ user_id, id });

    if (!tool) {
      throw new AppError('Tool does not exist.');
    }

    return tool;
  }
}

export default FindToolService;
