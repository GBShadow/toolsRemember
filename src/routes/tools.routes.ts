import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ToolsRepository from '../repositories/ToolsRepository';
import CreateToolService from '../services/CreateToolService';
import DeleteToolService from '../services/DeleteToolService';

const toolsRouter = Router();

toolsRouter.get('/', async (req, res) => {
  const toolsRepository = getCustomRepository(ToolsRepository);
  const tools = await toolsRepository.find();

  return res.json(tools);
});

toolsRouter.post('/', async (req, res) => {
  try {
    const { title, link, description, tag, user_id } = req.body;

    const createTool = new CreateToolService();

    const tool = await createTool.execute({
      title,
      link,
      description,
      tag,
      user_id,
    });

    return res.json(tool);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

toolsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTool = new DeleteToolService();

    await deleteTool.execute(id);

    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default toolsRouter;
