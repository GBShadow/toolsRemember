import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  user_id: string;
  id: string;
}

class DeleteToolService {
  private toolRepository;

  private userRepository;

  constructor(
    toolRepository: IToolsRepository,
    userRepository: IUserRepository,
  ) {
    this.toolRepository = toolRepository;
    this.userRepository = userRepository;
  }

  public async execute({ user_id, id }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const tool = await this.toolRepository.findById({ user_id, id });

    if (!tool) {
      throw new AppError('Tool does not exist');
    }

    await this.toolRepository.deleteTool(tool);
  }
}

export default DeleteToolService;
