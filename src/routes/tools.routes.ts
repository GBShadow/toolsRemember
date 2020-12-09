import { Router } from 'express';

import ListToolService from '../services/ListToolService';
import FindToolService from '../services/FindToolService';
import CreateToolService from '../services/CreateToolService';
import DeleteToolService from '../services/DeleteToolService';

const toolsRouter = Router();

toolsRouter.get('/', async (req, res) => {
  const listTools = new ListToolService();

  const tools = await listTools.execute();

  return res.json(tools);
});

toolsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const findTool = new FindToolService();

  const tool = await findTool.execute({ id });

  return res.json(tool);
});

toolsRouter.post('/', async (req, res) => {
  try {
    const { title, link, description, tags, user_id } = req.body;

    const createTool = new CreateToolService();

    const tool = await createTool.execute({
      title,
      link,
      description,
      tags,
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
