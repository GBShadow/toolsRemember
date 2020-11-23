import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ToolsRepository from '../repositories/ToolsRepository';
import CreateToolService from '../services/CreateToolService';

const toolsRouter = Router();

toolsRouter.get('/', async (req, res) => {
  const toolsRepository = getCustomRepository(ToolsRepository);
  const tools = await toolsRepository.find();

  return res.json(tools);
});

toolsRouter.post('/', async (req, res) => {
  try {
    const { title, link, description, tag } = req.body;

    const createTool = new CreateToolService();

    const tool = await createTool.execute({
      title,
      link,
      description,
      tag,
    });

    return res.json(tool);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
  return res.json();
});

export default toolsRouter;
