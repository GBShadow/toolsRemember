import AppError from '../../shared/errors/AppError';
import IToolsRepository from '../repositories/IToolsRepository';
import ToolsRepository from '../infra/typeorm/repositories/ToolsRepository';

class DeleteToolService {
  private toolRepository: IToolsRepository;

  constructor() {
    this.toolRepository = new ToolsRepository();
  }

  public async execute(id: string): Promise<void> {
    const tool = await this.toolRepository.findById(id);

    if (!tool) {
      throw new AppError('Tool does not exist');
    }

    await this.toolRepository.deleteTool(tool);
  }
}

export default DeleteToolService;
