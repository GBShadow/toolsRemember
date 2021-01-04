import AppError from '@shared/errors/AppError';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  user_id: string;
  id: string;
}

class DeleteToolService {
  private toolRepository: IToolsRepository;

  constructor(toolRepository: IToolsRepository) {
    this.toolRepository = toolRepository;
  }

  public async execute({ user_id, id }: IRequest): Promise<void> {
    const tool = await this.toolRepository.findById({ user_id, id });

    if (!tool) {
      throw new AppError('Tool does not exist');
    }

    await this.toolRepository.deleteTool(tool);
  }
}

export default DeleteToolService;
